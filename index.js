global.Promise = require('bluebird');
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = {
    status: 'success',
    data: 'Hello World'
  };
  next();
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});

// x-response-time
app.use(async (ctx, next) => {
  const start = new Date();

  await next();

  const ms = new Date() - start;

  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = new Date();

  await next();

  const ms = new Date() - start;

  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
