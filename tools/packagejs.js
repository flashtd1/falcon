var fse = require('fs-extra'),
    fs = require('fs'),
    path = require('path'),
    dirHelper = require('./dir_helper')

var rootPath = __dirname.split('/tools')[0]
var targetPath = rootPath + '/dist/js/entry.js'
var con = '';

fse.walk(rootPath + '/src/js/controllers/')
	.on('data', function(item) {
		if(!isDictionary(item.path)) {
			DealFile(item.path)
		}
	})
	.on('end', function() {
		dirHelper.mkdir(path.dirname(targetPath), 0777)
		fs.writeFile(targetPath, con)
		console.log('=============js 控制器入口写入完毕===========')
	})

var DealFile = function(file) {
	var filename = path.basename(file)

	var className = filename.split('.')[0].replace(/(\w)/,function(v){return v.toUpperCase()})

	var paths = file.split('/controllers/')[1].split('/')

	var package = ''

	paths.map((item) => {
		if(item != filename)
			package += item + '.'
		return (item != filename)
	})

	con += 'F.Controller.' + package + className +　' = require("./controllers/' + package.replace(/(\.)/,function(v) {return '/'}) + filename + '")\r\n'
}


var isDictionary = function(path) {
	return path.split('.').length == 1
}
