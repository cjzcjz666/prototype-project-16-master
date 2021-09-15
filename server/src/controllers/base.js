import {Base} from '../model/base.js';

export class BaseController {
    async bases() {
        return Base.findAll();
    }

    async createBase(payload) {
        const newBase = await Base.create({
            name: payload.name,
            desc: payload.desc,
        });
        return newBase.id;
    }

    async updateBase(id, payload) {
        await Base.update(
            {
                name: payload.name,
                desc: payload.desc
            },
            {
                where: {
                    id
                }
            }
        );
    }

    async deleteBase(id) {
        await Base.destroy({
            where: {
                id
            }
        });
    }
}
