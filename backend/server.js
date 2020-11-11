
require("@babel/register");

switch (process.env.NODE_ENV) {
    case "DEV":
        try {
            const result = require('dotenv').config({
                path: './src/env/.env_dev'
            })
            require('./src/index')
        } catch (e) {
            console.log(e)
        }
        break;
    case "PROD":
        require('dotenv').config({
            path: './src/env/.env_prod'
        })
        require('./src/index')
        break;
    default:
        break
}