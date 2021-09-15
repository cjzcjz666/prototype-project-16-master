import sequelize from 'sequelize';
import { dbInstance } from '../db/config.js';

export const Base = dbInstance.define('base', {
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.DataTypes.INTEGER,
    },
    name: {
        name: 'name',
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        name: 'desc',
        type: sequelize.DataTypes.TEXT
    },
});
