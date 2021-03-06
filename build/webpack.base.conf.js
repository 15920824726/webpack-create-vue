const  path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

// 处理文件引用路径问题  html中引用 ～assets js中引用 assets
function resolve(dir) {
    return path.join(__dirname,'..',  dir)
}

const config = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 50000
                }
            },
            { test: /\.vue$/, use: ['vue-loader'] }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.BannerPlugin('最终版权归edwin所有'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    resolve: {
        // 扩展名
        extensions: ['.js', '.css', '.json', '.vue'],
        // 定义路径别名
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'assets': resolve('src/assets'),
            'components': resolve('src/components'),
            'common': resolve('src/common')
        }
    }
};

module.exports = config;