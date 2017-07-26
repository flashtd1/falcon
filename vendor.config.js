'use strict'

let assets = {
  js:[
    'jQuery-2.2.0.min',
    'js.cookie',
    'bootstrap.min',
    'app.min',
    'underscore-min',
    'vue.min',
    'av-min',
    'jquery.twbsPagination'
  ],
  css: [
    'bootstrap.min',
    'AdminLTE.min',
    'skin-blue.min'
  ]
}

for(let key in assets) {
  assets[key] = assets[key].map((item) => {
    return './vendor/' + key + '/' + item + '.' + key
  }).join(' ')
}

module.exports = assets