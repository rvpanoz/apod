const path = require('path');
const webpack = require('webpack');
const isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
  var plugins = [];

  // expose NODE_ENV to webpack
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV
    }
  }));

  plugins.push(new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    '_': 'lodash'
  }));

  // production build
  if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  // development
  else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return plugins;
}

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: 'source-map',
  entry: './entry',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/public'
  },
  devServer: {
    open: false,
    contentBase: path.resolve(__dirname, './src')
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.hbs'],
    modules: [
      path.join(__dirname, './src'),
      "node_modules"
    ],
    alias: {
      'app-config': 'src/config',
      handlebars: 'handlebars/dist/handlebars.min.js',
      src: path.resolve(__dirname, 'src'),
      libc: path.resolve(__dirname, 'src/libc'),
      public: path.resolve(__dirname, 'src/public'),
      components: path.resolve(__dirname, 'src/components'),
      scripts: path.resolve(__dirname, 'src/scripts'),
      utilities: path.resolve(__dirname, 'src/utilities/'),
      templates: path.resolve(__dirname, 'src/templates/'),
      schemas: path.resolve(__dirname, 'src/schemas/'),
      views: path.resolve(__dirname, 'src/views/'),
      bower: path.resolve(__dirname, 'src/bower_components/')
    }
  },
  plugins: getPlugins(),
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          "style-loader", "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      // Font Definitions
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader']
      }
    ]
  }
}
