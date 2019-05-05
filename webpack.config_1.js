var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
	disable: process.env.NODE_ENV == 'development' ? true : false, // 开发环境下直接内联，不抽离
  filename: 'style/extractFromCss.css' // 单个entry时，可写死
});
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:extractCSS.extract({
          loader:'css-loader',
          options:{
            fallback:'vue-style-loader',
            publicPath:'../../'
          }
        })
      },      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { 
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        loader: 'file-loader',
        options: {
          limit: 1024 * 8, // 8k以下的base64内联，不产生图片文件
          fallback: 'file-loader', // 8k以上，用file-loader抽离（非必须，默认就是file-loader）
          name: '[name].[ext]?[hash]', // 文件名规则，默认是[hash].[ext]
          outputPath: 'images/fonts/', // 输出路径
        }
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: {
					loader: 'url-loader',
					options: {
						limit: 1024 * 8, // 8k以下的base64内联，不产生图片文件
						fallback: 'file-loader', // 8k以上，用file-loader抽离（非必须，默认就是file-loader）
						name: '[name].[ext]?[hash]', // 文件名规则，默认是[hash].[ext]
						outputPath: 'images/' // 输出路径
					}
				}
        /* loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        } */
      }
    ]
  },
  plugins: [
		new HtmlWebpackPlugin({
			/* filename: path.join(__dirname, 'entry.html'), */ // 生成的html(绝对路径：可用于生成到根目录)
        filename: 'entry.html', // 生成的html文件名（相对路径：将生成到output.path指定的dist目录下）
        template: './index.html', // 以哪个文件作为模板，不指定的话用默认的空模板
        publicPath:'../'
    }),
    extractCSS
	],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
