const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require("path");

module.exports = {
    entry: {
        index: './src/index.js'
	},
	output: {
    	path: path.join(__dirname, "/dist"),
    	filename: "index_bundle.js"
	},
    plugins: [
        new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: '200.html',
            chunks: ['index']
        }),
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