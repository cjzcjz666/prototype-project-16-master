import { Sequelize } from 'sequelize';
import { config } from '../config';



export const dbInstance = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    logging: true,
    timeout: 10000
});

