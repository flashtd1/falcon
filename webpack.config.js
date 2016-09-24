var webpack = require('webpack')
var WH = require('./tools/webpack_helper')


module.exports = {
	entry: WH.makeEntry(),
	output: {
		path: __dirname + '/dist/js',
		filename: "[name].js"
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['es2015-loose']
				} 
			}
		]
	},
	plugins:[
		new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
	]
}
