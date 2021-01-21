const requireDirectory = require('require-directory');
const Router = require("koa-router");
class InitManager {
    static initCore(app) {
        // 入口方法
        InitManager.app = app
        InitManager.loadConfig()
        InitManager.loadStatic()
        InitManager.loadLogger()
        InitManager.loadView()
        InitManager.loadSocket()
        InitManager.initLoadRouters()
    }
    // 加载配置文件
    static loadConfig () {
        const config = require('../config/config')
        global.config = config
    }
    // 加载http接口
    static initLoadRouters() {
        const modules = requireDirectory(module,`${process.cwd()}${global.config.apiPath}`,{
            visit:whenLoadModule
        })
        async function whenLoadModule(obj) {
            if(obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
    // 加载静态文件访问配置
    static loadStatic () {
        const path = require('path')
        const staticFiles = require('koa-static')
        InitManager.app.use(staticFiles(path.join(`${process.cwd()}/${global.config.publicPath}`)))
    }
    // 添加日志
    static loadLogger() {
        const Moment = require("moment");
        const koaLogger = require("koa-logger"); 
        let logger = new koaLogger((str) => {
            console.log(Moment().format('YYYY-MM-DD HH:mm:ss')+str);
        })
        InitManager.app.use(logger)
    }
    // 添加views/system下的页面
    static async loadView () {
        var views = require('koa-views');
        //  这种方式模板引擎为ejs
        InitManager.app.use(views(`${process.cwd()}/views/system`, {
            extension: 'ejs'
        }))
        const { readdir } = require('./utils')
        let modules = await readdir(`${process.cwd()}/views/system`);
        for(let i = 0;i<modules.length;i++) {
            let router = new Router()
            router.get(`/views/system/${modules[i]}`, async (ctx) => {
                await ctx.render(modules[i], {
                    user: 'admin',
                    // base: global.config.base
                    base: '/base'
                });
            });
            InitManager.app.use(router.routes())
        }
    }
    static async loadSocket () {
        InitManager.app.listen(global.config.port);
        console.log(`启动成功localhost:${global.config.port}`)

        let websockify = require("koa-websocket");
        const app = websockify(InitManager.app);
        app.listen(8888);
        let ctxs = [];
        /* 实现简单的接发消息 */
        app.ws.use((ctx, next) => {
            /* 每打开一个连接就往 上线文数组中 添加一个上下文 */
            ctxs.push(ctx);
            ctx.websocket.on("message", (message) => {
                console.log(JSON.stringify(message));
                

                for(let i = 0; i < ctxs.length; i++) {
                    ctxs[i].websocket.send(message);
                    // if (ctx == ctxs[i]) {
                    //     ctxs[i].websocket.send(message);
                    //     continue;
                    // }
                    
                }
            });
            ctx.websocket.on("close", (message) => {
                /* 连接关闭时, 清理 上下文数组, 防止报错 */
                let index = ctxs.indexOf(ctx);
                ctxs.splice(index, 1);
            });
        });

    }
    

}
module.exports = InitManager