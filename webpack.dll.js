const webpack = require('webpack')
const path = require('path')

console.log(`[dll]: ${process.env.NODE_ENV}`)

const plugins = [
  new webpack.DllPlugin({ // 会根据entry打包并生成manifest.json
    path: path.resolve(__dirname, "manifest-[name].json"),
    name: '[name]_[chunkhash]',
    context: __dirname,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_[chunkhash].dll.js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    utils: ['moment'],
    react: ['react', 'redux', 'react-redux']
  },
  plugins
}