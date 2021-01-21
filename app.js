const Koa = require('koa2');

const app = new Koa();


const InitManager = require('./core/init')
InitManager.initCore(app)