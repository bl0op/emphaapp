const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        App: './src/App.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['App']
        })
    ],
   	devServer: {
		contentBase: './dist/',
		historyApiFallback: true
    },
    module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: '/node_modules/',
				use: [
					'babel-loader'
				]
			},
			{
				test: /\.(css)$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(scss)$/,
				use: [
                    {
					    loader: 'style-loader',
                    },
                    {
					    loader: 'css-loader',
				    }, 
				    {
					    loader: 'sass-loader'
                    }
                ]
            },
           	{
				test: /\.(png|jpg|gif|jped|svg)$/,
				use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }
				]
			},
			{
				test: /\.(eot|otp|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
			            options: {
			            	name: '[name].[ext]',
			            	outputPath: 'fonts/'
			            }
					}
				]
			}
        ]
    }
};