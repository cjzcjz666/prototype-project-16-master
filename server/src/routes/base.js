import KoaRouter from 'koa-router';
import {BaseController} from '../controllers/base.js';
const baseRoute = new KoaRouter({
    prefix: '/api/base'
});


baseRoute.get('/', async function (ctx) {
    const data = await new BaseController().bases();
    ctx.body = {
        data,
        message: 'ok'
    };
});

baseRoute.post('/', async function(ctx) {
    const payload = ctx.request.body;
    const id = await new BaseController().createBase(payload);
    ctx.body = {
        data: id,
        message: 'ok'
    };
});

baseRoute.put('/:id', async function(ctx) {
    const id = Number(ctx.params.id);
    const payload = ctx.request.body;
    if (isNaN(id)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'id must be number',
        };
    } else {
        await new BaseController().updateBase(id, payload);
        ctx.body = {
            message: 'ok'
        }
    }
});

baseRoute.delete('/:id', async function(ctx) {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'id must be number',
        };
    } else {
        await new BaseController().deleteBase(id);
        ctx.body = {
            message: 'ok'
        }
    }
});


export {
    baseRoute
}
