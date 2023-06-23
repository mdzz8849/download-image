const Koa = require('koa');
const router = require('koa-router')()
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const {download} = require('./download-controller') 

const app = new Koa();
app.use(cors())

app.use(async (ctx, next) => {
  console.log(`${ctx.method}`,`${ctx.url}`);
  await next()
})

/**
 * request body
 * {
 *   url: 'http://xxx/xxx.png'
 * }
 */
router.post('/download', (ctx, next) => {
  console.log(ctx.request.body)
  const target = ctx.request.body.url;
  download(target, Date.now() + '.png', () => {console.log('done')})
  ctx.response.body = 'success'
})

app.use(bodyParser());
app.use(router.routes())


app.listen(3000);
console.log('Downlaod-Image listening on port 3000')