const router = require('koa-router')()
const KoaRouterInterceptor = require('koa-router-interceptor');

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

module.exports = router
