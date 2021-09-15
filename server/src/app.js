import Koa from 'koa';
import json from 'koa-json';
import cors from 'koa2-cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import router from './routes/index.js';
import { dbInstance } from './db/config.js';

const app = new Koa
app.use(cors());
app.use(bodyParser());
app.use(json());
app.use(logger());

app.use(router());


app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});


app.listen(3000, async () => {
  console.log('service running :3000');
  // 下面一行代码用于同步数据库变更，在更新数据库表的设计之后，可以放开注释
  // await dbInstance.sync();
});

