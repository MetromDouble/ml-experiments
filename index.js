global.Promise = require('bluebird');
const util = require('util');
const Koa = require('koa');
const Router = require('koa-router');
const exec = util.promisify(require('child_process').exec);

const app = new Koa();
const router = new Router();

async function runNet() {
  const { stdout, stderr } = await exec('./compiled');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);

  return stdout;
}

router.get('/', async (ctx, next) => {
  const result = await runNet();

  ctx.body = {
    status: 'success',
    data: result
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
