/* eslint-disable */
import { resolve } from 'path'
import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import Global from 'glob'

export default (_, args) => {
	const environment = args.env.test ? 'test' : args.mode
	const testFiles = Global.sync('./**/*.test.ts').filter(path => path.includes('node_modules') === false)
	return {
		entry: environment === 'test'
			? ['./application/index.ts', ...testFiles]
			: './application/index.ts',
		output: {
			filename: 'main.js',
			path: resolve(args.env.test ? 'test-temp' : 'dist'),
			publicPath: '/'
		},
		devServer: {
			historyApiFallback: true
		},
		stats: 'minimal',
		module: {
			rules: [
				{
					test: /\.ts?$/,
					loader: 'ts-loader',
					options: { allowTsInNodeModules: true }
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin(),
			new CopyPlugin({
				patterns: [
					{
						from: 'node_modules/@3mo/del/www/',
						to: '',
						noErrorOnMissing: true
					}
				]
			}),
			// new FaviconsWebpackPlugin({
			// 	logo: 'node_modules/@3mo/del/www/assets/images/3mo.svg',
			// 	manifest: './manifest.json',
			// 	favicons: {
			// 		appleStatusBarStyle: 'default'
			// 	}
			// }),
			new webpack.DefinePlugin({
				environment: JSON.stringify(environment)
			})
		],
		resolve: {
			extensions: ['.ts', '.js'],
			plugins: [
				new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
			]
		},
		optimization: environment === 'development' ? {
			minimize: false,
			minimizer: undefined
		} : {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						output: {
							comments: false,
						},
					},
					extractComments: false,
				})
			],
		}
	}
}