const config = {
    publicPath: '/public', //静态资源位置
    apiPath: '/app/api',
    port: 3000,
    database: { //mysql
        dbName: 'front',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: 'root'
    }
}

module.exports = config