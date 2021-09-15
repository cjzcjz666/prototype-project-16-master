import combineRouters from 'koa-combine-routers';
import { baseRoute } from './base.js';

const router = combineRouters(baseRoute);

export default router;
