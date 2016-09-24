'use strict'

const fs = require('fs'),
      path = require('path')


const mkdir = (dir, mode) => {
	if(fs.existsSync(dir)) {
		return true
	}
	else {
		if(mkdir(path.dirname(dir),mode)) {
			fs.mkdir(dir, mode)
			return true
		}
	}
}

module.exports = {
	mkdir: mkdir
}