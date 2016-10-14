const run = require('browser-run');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractSVGPlugin = require('svg-sprite-loader/lib/extract-svg-plugin');


const good = {
  entry: './index.js',
  output: {filename: 'out/good.js'},
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-sprite'
      }
    ]
  }
};

const bad = {
  entry: './index.js',
  output: {filename: 'out/bad.js'},
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: ExtractSVGPlugin.extract('svg-sprite')
      }
    ]
  },
  plugins: [
    new ExtractSVGPlugin('out/icons.svg')
  ]
};


function runTest(config, name) {
  webpack(config, function () {
    const out = fs.readFileSync(path.join('out', name+'.js'), {encoding: 'utf-8'});

    let browser = run();
    browser.pipe(process.stdout);
    browser.end(out);
  })
}


runTest(good, 'good');
runTest(bad, 'bad');
