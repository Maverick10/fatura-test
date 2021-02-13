const SequelizeAuto = require('sequelize-auto');
require('dotenv').config();
const env = process.env;
console.log(env.DATABASE_USERNAME, env.DATABASE_PASSWORD);
const auto = new SequelizeAuto(env.DATABASE_NAME, env.DATABASE_USERNAME,
    env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    dialect: 'mysql',
    directory: './models',
    port: env.DATABASE_PORT,
    additional: {
        timestamps: false
    }
})

auto.run();