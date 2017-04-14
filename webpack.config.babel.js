
import { resolve } from 'path';
import { DefinePlugin, EnvironmentPlugin } from 'webpack';
import WXAppWebpackPlugin from 'wxapp-webpack-plugin';

const isDev = process.env.NODE_ENV !== 'production';

export default {
	entry: {
		app: [
			`es6-promise/dist/es6-promise.auto${isDev ? '.min' : ''}.js`,
			'./src/utils/bomPolyfill.js',
			'./src/app.js',
		],
	},
	output: {
		filename: '[name].js',
		path: resolve('dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /src/,
				loader: 'babel-loader',
			},
			{
				test: /\.(png|jpg|gif|json)$/,
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
						options: {
							includePaths: [resolve('src', 'styles')]
						},
					},
				],
			},
			{
				test: /\.wxml$/,
				include: /src/,
				loader: 'wxml-loader',
			},
		],
	},
	plugins: [
		new EnvironmentPlugin({
			NODE_ENV: 'development',
		}),
		new DefinePlugin({
			__DEV__: isDev,
		}),
		new WXAppWebpackPlugin(),
	],
	devtool: isDev ? 'source-map' : false,
	resolve: {
		modules: ['src', 'node_modules'],
	},
	watchOptions: {
		ignored: /dist|manifest/,
		aggregateTimeout: 300,
	},
};
