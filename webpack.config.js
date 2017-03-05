// var webpack = require('webpack');
// var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CompressionPlugin = require("compression-webpack-plugin");


module.exports = {
  entry: [
    'script!rtc.min.js',
    './frontend/src/index.jsx'
  ],


  // plugins: [
 
  //   new ExtractTextPlugin("bundle.css", {allChunks: false}),
  //   new webpack.optimize.AggressiveMergingPlugin(),
  //   new webpack.optimize.OccurrenceOrderPlugin(),
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.UglifyJsPlugin({
  //     mangle: true,
  //     compress: {
  //       unused: true,
  //       dead_code: true,
  //       drop_debugger: true,
  //       conditionals: true,
  //       evaluate: true,
  //       drop_console: true, // strips console statements
  //       sequences: true,
  //       booleans: true,

  //       warnings: false, // Suppress uglification warnings
  //       pure_getters: true,
  //       unsafe: true,
  //       unsafe_comps: true,
  //       screw_ie8: true
  //     },
  //     output: {
  //       comments: false,
  //     },
  //     exclude: [/\.min\.js$/gi] // skip pre-minified libs
  //   }),
  //   new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), 
  //   new CompressionPlugin({
  //     asset: "[path].gz[query]",
  //     algorithm: "gzip",
  //     test: /\.js$|\.css$|\.html$/,
  //     threshold: 10240,
  //     minRatio: 0
  //   }),

  //   new webpack.DefinePlugin({
  //   "process.env": { 
  //      NODE_ENV: JSON.stringify("production") 
  //     }
  //   })
  // ],


  output: {
    path: __dirname,    
    filename: './frontend/public/bundle.js'
  },

  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './frontend/src/'      
    ],
    alias: {
      applicationStyles: 'frontend/src/styles/app.scss',      
    },
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {      
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }      
    ]
  }, 
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
};
