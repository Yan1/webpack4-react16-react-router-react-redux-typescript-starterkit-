const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

console.log(`[prod]: ${process.env.NODE_ENV}`)

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map', // TODO
})