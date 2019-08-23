const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

// const config = require('./webpack.config')
const config = require('./webpack.dev')

const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
  historyApiFallback: true,
  open: true,
}

WebpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)
server.listen(5000, 'localhost', () => {
  console.log('dev server is listening on port 5000')
})