const webpack = require('webpack')
const path = require('path')

console.log(`[dll]: ${process.env.NODE_ENV}`)

const plugins = [
  new webpack.DllPlugin({ // 会根据entry打包并生成manifest.json
    path: 'manifest-react.json',
    name: '[name]_[chunkhash]',
    context: __dirname,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

const vendor = ['react', 'redux', 'react-redux']

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_[chunkhash].dll.js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: vendor,
  },
  plugins: plugins
}