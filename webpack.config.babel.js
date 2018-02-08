import { resolve } from 'path';
import {
	DefinePlugin,
	EnvironmentPlugin,
	IgnorePlugin,
	optimize
} from 'webpack';
import WXAppWebpackPlugin, { Targets } from 'wxapp-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';

const { NODE_ENV, LINT, NO_LINT } = process.env;
const isDev = NODE_ENV !== 'production';
const shouldLint = (!isDev || (!!LINT && LINT !== 'false')) && !NO_LINT;

const relativeFileLoader = (ext = '[ext]') => [
	{
		loader: 'file-loader',
		options: {
			publicPath: '',
			useRelativePath: true,
			name: `[name].${ext}`,
			emitFile: false
		}
	},
	{
		loader: 'file-loader',
		options: {
			publicPath: '',
			context: resolve('src'),
			name: `[path][name].${ext}`
		}
	}
];

export default (env = {}) => {
	const min = env.min;
	const target = env.target || 'Wechat';
	const isWechat = env.target !== 'Alipay';
	const isAlipay = !isWechat;
	return {
		entry: {
			app: [
				`es6-promise/dist/es6-promise.auto${isDev ? '.min' : ''}.js`,
				'./src/utils/bomPolyfill.js',
				'./src/app.js'
			]
		},
		output: {
			filename: '[name].js',
			publicPath: '/',
			path: resolve('dist', isWechat ? 'wechat' : 'alipay')
		},
		target: Targets[target],
		module: {
			rules: [
				{
					test: /\.js$/,
					include: /src/,
					exclude: /node_modules/,
					use: ['babel-loader', shouldLint && 'eslint-loader'].filter(Boolean)
				},
				{
					test: /\.wxs$/,
					include: /src/,
					exclude: /node_modules/,
					use: [
						...relativeFileLoader(),
						'babel-loader',
						shouldLint && 'eslint-loader'
					].filter(Boolean)
				},
				{
					test: /\.scss$/,
					include: /src/,
					use: [
						...relativeFileLoader('wxss'),
						{
							loader: 'sass-loader',
							options: {
								includePaths: [resolve('src', 'styles'), resolve('src')]
							}
						}
					]
				},
				{
					test: /\.(json|png|jpg|gif|wxss)$/,
					include: /src/,
					use: relativeFileLoader()
				},
				{
					test: /\.wxml$/,
					include: resolve('src'),
					use: [
						...relativeFileLoader(isWechat ? 'wxml' : 'axml'),
						{
							loader: 'wxml-loader',
							options: {
								root: resolve('src')
							}
						}
					]
				}
			]
		},
		plugins: [
			new EnvironmentPlugin({
				NODE_ENV: 'development'
			}),
			new DefinePlugin({
				__DEV__: isDev,
				__WECHAT__: isWechat,
				__ALIPAY__: isAlipay,
				wx: isWechat ? 'wx' : 'my'
			}),
			new WXAppWebpackPlugin({
				clear: !isDev
			}),
			new optimize.ModuleConcatenationPlugin(),
			new IgnorePlugin(/vertx/),
			isDev && new DashboardPlugin(),
			shouldLint && new StylelintPlugin(),
			min && new MinifyPlugin(),
		].filter(Boolean),
		devtool: isDev ? 'source-map' : false,
		resolve: {
			modules: [resolve(__dirname, 'src'), 'node_modules']
		},
		watchOptions: {
			ignored: /dist|manifest/,
			aggregateTimeout: 300
		}
	};
};
