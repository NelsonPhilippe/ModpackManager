const fs = require("fs");
const path = require("path");
const md5File = require("md5-file");
const zip = require('./zip.js');
const rimraf = require('rimraf')


module.exports = {
    updateModpack: async (extensions) => {

        fs.readdir('minecraft', async (err, files) => {
            if (err) {
                return;
            }

            files.forEach((file) => {

                if(file === 'modpack.zip' || file === 'modpack.rar'){
                    return;
                }

                try {
                    if(fs.statSync('minecraft/' + file).isDirectory()) {
                        rimraf.sync('minecraft/' + file);
                    }else {
                        fs.unlinkSync('minecraft/' + file);
                    }
                }catch (e) {
                    console.log(e)
                }
            });

            await zip.extractFile('minecraft', 'modpack.' + extensions);


            const path_file = walkDir("minecraft")

            const data = []
            const exist = fs.existsSync('pack.json')

            if (exist) {
                fs.unlinkSync('pack.json')
            }

            for (const path of path_file) {
                if(!path.includes('modpack.zip')){
                    data.push(await data_format(path));
                }
            }

            let json_data = JSON.stringify(data)
            // console.log(json_data)

            fs.writeFileSync('pack.json', json_data, 'utf8')
        });



        return {
            statusCode: 200,
            response: 'Modpack updated'
        }
    },
    checkFiles: async (packData) => {
        const data = JSON.stringify(fs.readFileSync('pack.json'));
        const originalChecksum = [];
        const userChecksum = [];
        const toDownload = [];

        for(let originalPack of data){
            const checkSum = originalPack.hash;
            originalChecksum.push(originalPack);
        }

        for(let userPack of packData){
            const checksum = userPack.hash;
            userChecksum.push(userPack);
        }

        originalChecksum.forEach(element => {
            if(!userChecksum.includes(element)){
                toDownload.push(element.path);
            }
        });

        return toDownload;

    }
}


const walkDir = (dir) => {

    const path_file = [];
    function walk(dir) {
        fs.readdirSync(dir).forEach(f => {
            let dirPath = path.join(dir, f);
            let isDirectory = fs.statSync(dirPath).isDirectory();
            isDirectory ?
                walk(dirPath) : path_file.push(path.join(dir, f));
        });
    }

    walk(dir);
    return path_file;
};

const data_format = async (data) => {

    let split = data.split('\\');
    let mc = 0;

    for(let i = 0; i < split.length; i++){
        if(split[i] === 'minecraft'){
            mc = i
            break
        }
    }

    let path_minecraft = ""
    for(let i = mc; i < split.length; i++){

        if(split[i] === 'minecraft'){
            continue
        }
        if((i + 1) === split.length){
            path_minecraft = path_minecraft + split[i]
            continue
        }
        path_minecraft = path_minecraft + split[i] + '/'
    }

    return {
        'name': split[split.length - 1],
        'hash': await md5File(data),
        'path': path_minecraft
    };

}