var path = require('path');
var webpack = require('webpack');
const packagejson = require("./package.json");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
	disable: process.env.NODE_ENV == 'development' ? true : false, // 开发环境下直接内联，不抽离
  filename: 'style/[name].css', // 单个entry时，可写死
  publicPath:'dist/style/',
  allChunks: true
});//导出css文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const copyTxt=new CopyWebpackPlugin([{
  from:path.join(__dirname,'src/assets/a.txt'),to:path.join(__dirname,'dist/data/')
}]);//复制文件到指定目录
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  entry: {
    build:'./src/main.js',
    vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库,vue,vuex,vue-router,element-ui,mint-ui,animate,axios等
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        /* use:[
          'vue-style-loader',
          'css-loader'
        ] */
        loader:ExtractTextPlugin.extract({
          use:'css-loader',
          fallback:'vue-style-loader'
        })
      },
      {
        test: /\.sass$/,
        use:[
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, 
      {
        test: /\.less$/,
        use:[
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
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
        options:{
          publicPath:'../fonts/',
          outputPath:'fonts/'
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
						outputPath: 'images/', // 输出路径
						publicPath: 'dist/images/'  // 可访问到图片的引用路径(相对/绝对)
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
			  /* filename: path.join(__dirname, 'entry.html'),  */// 生成的html(绝对路径：可用于生成到根目录)
        filename: '../entry.html', // 生成的html文件名（相对路径：将生成到output.path指定的dist目录下）
        template: './template.html', // 以哪个文件作为模板，不指定的话用默认的空模板
        /* chunks:['runtime','vendor','build'] */
    }),
    new BundleAnalyzerPlugin(),     //webpack打包可视化工具
    /* new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor','runtime'],
        filename: '[name].js'
    }), */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].js',
      minChunks: function (module,count) {
        console.log(module.resource,`引用次数${count}`);
        //"有正在处理文件" + "这个文件是 .js 后缀" + "这个文件是在 node_modules 中"
          return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
          )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
        filename: 'js/[name].js',
        chunks: ['vendor']    //来源是vendor.js
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/[name].js',
        chunks:['build']             //从main.js文件中提取自定义公共模块
    }), 
    /* new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].js'
    }), */
    new ExtractTextPlugin({
      /* disable: process.env.NODE_ENV == 'development' ? true : false, */  // 开发环境下直接内联，不抽离
      filename: 'style/[name].css', // 单个entry时，可写死
      publicPath:'dist/style/',
      allChunks: true
    })
    
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
