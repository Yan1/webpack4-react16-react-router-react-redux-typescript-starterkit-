const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AssertsHtmlPlugin = require('add-asset-html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 5 })

const isProduction = process.env.NODE_ENV === 'production'
console.log(`[common]: ${process.env.NODE_ENV}`)
module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: isProduction ? '[name].[contenthash:8].bundle.js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        include: path.resolve('node_modules', 'lodash'),
        sideEffects: false
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProduction, // 若不加这句，会重新加载，加这句会局部更新
            },
          },
          // 'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader?limit=819200'  // 819200字节
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader?limit=5000',
        // TODO
        query: {
          useRelativePath: true
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ // 将 样式 提取出来并生成css文件
      filename: isProduction ? '[name].[contenthash:8].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[contenthash:8].css' : '[id].css',
    }),
    new HtmlWebpackPlugin({
      title: 'ERP系统',
      template: './src/index.html',
      favicon: './favicon.ico',
      // meta: {},
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest-utils.json')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest-react.json')
    }),
    new AssertsHtmlPlugin({
      filepath: path.resolve(__dirname, './dist/*.dll.js')
    }),
    new ForkTsCheckerWebpackPlugin({tslint: true}),
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      automaticNameDelimiter: '~'
    },
    runtimeChunk: true,
  }
}