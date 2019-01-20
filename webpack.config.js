const path = require('path')
const autoprefixer = require ('autoprefixer')

module.exports = {
  devtool: 'cheap-module-eval-source-map', // Enable dev tools
  entry: './src/index.js', // File to begin with
  output: {
    path: '',
    filename: 'bundle.js', // Bundled file to be created
    publicPath: path.resolve(__dirname, 'dist') // Current Directory / dist
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
          }
        ]
      }
    ]
  }
}