'use strict'
const PC = require('./project.config'),
  Vendor = require('./vendor.config'),
  colors = require('colors')

const tasks = {
  'clear': {
    cmd: 'rm -rf ' +　PC.assets.dist + ' | mkdir ' + PC.assets.dist.substring(1),
    tip: '清空目标目录',
    ignore: true
  },
  'clear:js' : {
    cmd: 'rm -rf ' +　PC.js.dist + ' | mkdir ' + PC.js.dist.substring(2),
    tip: '清空js目标目录',
    ignore: true
  },
  'clear:controllers:js': {
    cmd: 'rm -rf ' + PC.js.dist + '/controllers',
    tip: '清空JS 控制器目标目录',
    ignore: true
  },
  'clear:css': {
    cmd: 'rm -rf ' + PC.css.dist + ' | mkdir ' + PC.css.dist.substring(2),
    tip: '清空css目录',
    ignore: true
  },
  'clear:controllers:css': {
    cmd: 'rm -rf ' + PC.css.dist + '/controllers',
    tip: '清空css 控制器目录',
    ignore: true
  },
  'package:js': {
    cmd: 'node ./tools/packagejs.js',
    tip: '生成js入口文件',
    ignore: true
  },
  'webpack': {
    cmd: 'webpack',
    tip: 'webpack 打包JS',
    // ignore: true
  },
  'vendor:js' : {
    cmd: 'uglifyjs ' + Vendor.js + ' dist/js/common.js -o ' + PC.js.vendor.dist + ' --compress',
    tip:'打包公共 JS',
    ignore: true
  },
  'vendor:css': {
    cmd: 'cat ' + Vendor.css + ' ./dist/css/common/* | cleancss -o  dist/css/vendor.min.css --s0',
    tip: '公共 CSS 打包压缩'
  },
  // 'minify:js' : {
  //   cmd: 'ls -l',
  //   tip: '压缩代码',
  //   ignore: true
  // },
  'jade:controllers': {
    cmd: 'jade ' + PC.jade.src + '/*.jade -o ' +　PC.jade.dist,
    tip: 'jade 转 html',
    ignore: true
  },
  'pages': {
    cmd: 'node tools/page_helper.js',
    tip: '更新pages配置'
  }
}

const group = {
  'js': ['webpack'],
  'css': [],
  'view': []
}

module.exports = {
  tasks: tasks,
  group: group
}