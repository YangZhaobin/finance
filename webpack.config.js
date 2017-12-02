var path = require('path');
var webpack = require('webpack');
var rootPath = path.resolve(__dirname, 'static/');

function join(dir) {
    return path.join(__dirname, 'static', 'js', dir);
}

module.exports = {
    entry: {
        main_bundle: path.resolve(__dirname, 'static/js/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'static/dist/'),

        filename: '[name].js',

        // 非主入口的文件名，即未被列在entry中，却又需要被打包出来的文件命名配置
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(woff2?|ttf|eot|otf)(\?.*)?$/,
            use: [
                'url-loader?limit=10000&minetype=application/font-woff'
            ]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
                'url-loader?limit=10000'
            ]
        }, {
            test: /\.(swf|svg|png|jpe?g|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.vue$/,
            use: [
                'vue-loader'
            ]
        }, {
            test: /\.html$/,
            use: [
                'html-loader'
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
        }, {
            test: /\.json$/,
            use: [
                'json-loader'
            ]
        }]
    },
    devServer: {
        port: 8088,
        publicPath: path.resolve(__dirname, 'static/dist/'),
        historyApiFallback: true, //不跳转
        noInfo: false,
        hot: true,
        inline: true //实时刷新
    },
    // 其他解决方案
    resolve: {
        // require时省略的扩展名，遇到.vue结尾的也要去加载
        extensions: ['.js', '.vue'],
        // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
        alias: {
            '@rootPath': rootPath,
            'vue$': 'vue/dist/vue.common'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}