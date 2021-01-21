const fs = require('fs')
async function readdir(path) {
    return new Promise(async (resolve,rejects) => {
        const dir = await fs.promises.opendir(path)
        let arr = []
        for await (const dirent of dir) {
            let name = dirent.name
            if(name.indexOf('.ejs') > -1) {
                arr.push(name.replace('.ejs',''))
            }
        } 
        resolve(arr)
    })
    
}
module.exports = {
    readdir
}