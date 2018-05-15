global.Promise = require('bluebird');
const util = require('util');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const exec = util.promisify(require('child_process').exec);

const app = new Koa();
const router = new Router();

async function runNet(number) {
  const { stdout, stderr } = await exec(`compiled.exe ${number || 0}`);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);

  return stdout;
}

router.get('/net', async (ctx, next) => {
  try {
    const { number } = ctx.request.query;
    const result = await runNet(number);

    ctx.body = {
      status: 'success',
      data: result
    };
    next();
  } catch (err) {
    console.error(err);
  }
});

app.use(serve(__dirname + '/public'));

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
