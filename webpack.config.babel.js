
import { resolve } from 'path';
import { DefinePlugin, EnvironmentPlugin } from 'webpack';
import WXAppWebpackPlugin from 'wxapp-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';

const { NODE_ENV, LINT } = process.env;
const isDev = NODE_ENV !== 'production';
const shouldLint = !isDev || (!!LINT && LINT !== 'false');

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
		publicPath: '/',
		path: resolve('dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /src/,
				use: [
					'babel-loader',
					shouldLint && 'eslint-loader',
				].filter(Boolean),
			},
			{
				test: /\.json$/,
				include: /src/,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							name: '[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				include: /src/,
				loader: 'file-loader',
				options: {
					name: '[name]_[hash:7].[ext]',
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
							includePaths: [
								resolve('src', 'styles'),
								resolve('src'),
							],
						},
					},
				],
			},
			{
				test: /\.wxml$/,
				include: /src\/pages/,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							name: '[name].[ext]',
						},
					},
					{
						loader: 'wxml-loader',
						options: {
							root: resolve('src'),
						},
					},
				],
			},
			{
				test: /\.wxml$/,
				include: /src/,
				exclude: /src\/pages/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]_[hash:7].[ext]',
						},
					},
					{
						loader: 'wxml-loader',
						options: {
							root: resolve('src'),
						},
					},
				],
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
		shouldLint && new StylelintPlugin(),
	].filter(Boolean),
	devtool: isDev ? 'source-map' : false,
	resolve: {
		modules: [resolve(__dirname, 'src'), 'node_modules'],
	},
	watchOptions: {
		ignored: /dist|manifest/,
		aggregateTimeout: 300,
	},
};
