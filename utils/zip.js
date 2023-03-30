const AdmZip = require("adm-zip");
const {createExtractorFromFile} = require("node-unrar-js");
async function extractFile(dirPath, file){

    if(file.toString().endsWith('.zip')){
        const zip = new AdmZip(dirPath + '/' + file);
        zip.extractAllTo(dirPath, true);
        return;
    }

    if(file.toString().endsWith('.rar')){

        const extractor = await createExtractorFromFile({
            filepath: dirPath + file,
            targetPath: dirPath
        });
        const zip = new AdmZip(dirPath + '/' + file);
        zip.extractAllTo(dirPath, true);
        [...extractor.extract().files];
        return;
    }

    throw new Error('File not supported');


}

module.exports = {extractFile}