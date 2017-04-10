
import path from 'path';
import WXAppWebpackPlugin from 'wxapp-webpack-plugin';

export default {
	entry: {
		app: ['./src/utils/bomPolyfill.js', './src/app.js'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /src/,
				loader: 'babel-loader',
			},
			{
				test: /\.(wxss|wxml|json)$/,
				include: /src/,
				loader: 'file-loader',
				options: {
					useRelativePath: true,
					name: '[name].[ext]',
				}
			},
			{
				test: /\.scss$/,
				include: /src/,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							name: '[name].wxss',
						}
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
	plugins: [
		new WXAppWebpackPlugin(),
	],
	devtool: 'source-map',
	resolve: {
		modules: ['src', 'node_modules'],
	},
	watchOptions: {
		ignored: /dist|manifest/,
		aggregateTimeout: 300,
	},
};
