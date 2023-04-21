const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: resolve(__dirname, './src/index.ts'),
    output: {
        filename: 'js/[name].[hash:6].js',
        path: resolve(__dirname, 'dist/'),
        clean: true,
    },
    devServer: {
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            }
        ],
    },
    resolve: {
        alias: {
            '~/*': resolve(__dirname,'./src/')
        },
        extensions: ['.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: resolve(__dirname, './src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].[hash:6].css',
            chunkFilename: 'css/[name].[hash:6].css'
        })
    ],
    mode: 'production'
};
