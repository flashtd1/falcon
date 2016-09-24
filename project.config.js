
module.exports = {
  assets: {
    src: './src',
    dist: './dist'
  },
  js: {
  	src: './src/js',
  	dist: './dist/js',
    vendor: {
      dist: 'dist/js/vendor.min.js'
    }
  },
  webpack: {
    src: './src/js/controllers',
    dist: '/dist/js/controllers'
  },
  css: {
  	src: './src/sass',
  	dist: './dist/css'
  },
  jade: {
  	src: './views',
  	dist: './dist/views'
  }
}