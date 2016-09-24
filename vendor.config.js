'use strict'

let assets = {
  js:[
    'jQuery-2.2.0.min',
    'bootstrap.min',
    'app.min'
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