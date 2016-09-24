'use strict'
require('babel-polyfill')

const Koa = require('koa'),
  app = new Koa(),
  views = require('koa-views'),
  router = require('koa-router')(),
  serve = require('koa-static'),
  mount = require('koa-mount'),
  url = require('url'),
  qs = require('querystring'),
  fs = require('fs'),
  pages = require('./lib/page'),
  menus = require('./lib/sidebar')

// 静态文件挂载
app.use(mount('/dist', serve(__dirname + '/dist')))
app.use(mount('/', serve(__dirname + '/public')))
app.use(mount('/', serve(__dirname + '/vendor')))
app.use(mount('/', serve(__dirname + '/images')))


// 视图处理
app.use(views(__dirname + '/views', {
  map: {
    jade: 'jade'
  }
}));

let render = async (ctx, controller, action) => {
  let vi = controller + '/' + action + '.jade'
  await ctx.render(vi, {
    params: ctx.params,
    route: {
      controller: controller,
      action: action
    },
    query: qs.parse(url.parse(ctx.request.url).query),
    page: pages[controller + '/' +  action],
    menus: menus
  })
}

router.get('/:controller/:action', async (ctx, next) => {
  await render(ctx, ctx.params.controller, ctx.params.action)
})

router.get('/:controller', async (ctx, next) => {
  let controller = ctx.params.controller
  if(fs.existsSync(__dirname + '/views/home/' + controller + '.jade')) {
    await render(ctx, 'home', controller)
  } else {
    await render(ctx, controller, 'index')
  }
})

router.get('/', async (ctx, next) => {
  await render(ctx, 'home', 'index')
})


app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000)