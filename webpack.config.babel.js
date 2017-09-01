
import { resolve } from 'path';
import { DefinePlugin, EnvironmentPlugin, optimize } from 'webpack';
import WXAppWebpackPlugin from 'wxapp-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';

const { NODE_ENV, LINT, NO_LINT } = process.env;
const isDev = NODE_ENV !== 'production';
const shouldLint = (!isDev || (!!LINT && LINT !== 'false')) && !NO_LINT;

const createRelativeFile = (outputPath, ext = '[ext]') => ({

	/**
	 * TODO
	 *
	 * should use `useRelativePath: true`, but there's a bug
	 * https://github.com/webpack-contrib/file-loader/issues/149
	 */

	publicPath: (file) => `../../${file}`,
	outputPath: outputPath,
	name: `/[name]_[hash:7].${ext}`,
});

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
				test: /\.wxs$/,
				include: /src/,
				use: [
					{
						loader: 'file-loader',
						options: createRelativeFile('wxs', 'wxs'),
					},
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
				options: createRelativeFile('images'),
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
				test: /\.wxss$/,
				include: /src/,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							name: '[name].wxss',
						}
					},
				],
			},
			{
				test: /\.wxml$/,
				include: resolve('src/pages'),
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
				include: resolve('src'),
				exclude: resolve('src/pages'),
				use: [
					{
						loader: 'file-loader',
						options: createRelativeFile('wxml'),
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
		new optimize.ModuleConcatenationPlugin(),
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
