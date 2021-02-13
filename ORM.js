const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

let models, sequelize;

const createModels = async () => {
    models = require('./models/init-models')(sequelize);
}

module.exports = {
    config: async () => {
        sequelize = new Sequelize(process.env.DATABASE_NAME,
            process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
            host: process.env.DATABASE_HOST,
            dialect: 'mysql',
            logging: false
        });
        createModels();
    },

    getModels: async () => {
        return models;
    }
}
module.exports.config();