const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    entry: path.join(__dirname, './src/main.js'),//入口文件
    output: {
        path: path.join(__dirname, './dist'), //出口（打包后）文件路径
        filename: 'bundle.js' //出口（打包后））文件名
    },
    /*devServer:{
        hot:true,
        open:true,
        port:3000
    }*/
    plugins: [
      new HtmlWebpackPlugin({
        //指定模版页面
        template: path.join(__dirname, './src/index.html'),
        //指定生成页面的名称
        filename: 'index.html'
      }),
      new VueLoaderPlugin(),
    ],
    module: {
      rules: [
        {test: /\.css$/, use: ['style-loader', 'css-loader']},
        {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
        {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
        {test: /\.(jpg|jpeg|png|gif)$/, use: 'url-loader'},
        {test: /\.(ttf|woff2|woff|eot|svg)$/, use: 'url-loader'},
        {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
        {test: /\.vue$/, use: 'vue-loader'},
      ]
    }
}
