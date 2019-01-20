const path = require('path')
const autoprefixer = require ('autoprefixer')
const HtmlWebpackPlugin = require ('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map', // Enable dev tools
  entry: './src/index.js', // File to begin with
  output: {
    path: path.resolve(__dirname, 'dist'), // Current Directory / dist
    filename: 'bundle.js', // Bundled file to be created
    chunkFilename: '[id].js', // Filenames for lazy loading
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Test for files with this extension
        loader: 'babel-loader', // Use this loader
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ // Use with multiple loaders or config -- loaded from bottom to top
          { loader: 'style-loader' },
          {
            loader: 'css-loader', // Ability to use css
            options: { // Configurations
              importLoaders: 1, // Must tell css loader that postcss-loader is being used
              modules: true, // Enable CSS modules
              localIdentname: '[name]__[local]__[hash:base64:5]' // Class name __ Component Name __ Hash
            }
          },
          {
            loader: 'postcss-loader', // Could be configured for sass
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({ // Adds browser specific prefixes to css
                  browsers: [
                    "> 1%",
                    "last 2 versions"
                  ]
                })
              ]
            }
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'url-loader?limit=8000&name=images/[name].[ext]' // Images less than 8000 bytes
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}