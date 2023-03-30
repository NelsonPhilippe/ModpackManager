const AdmZip = require("adm-zip");
const {createExtractorFromFile, Unrar} = require("node-unrar-js");
const fs = require("fs");
async function extractFile(dirPath, file){

    if(file.toString().endsWith('.zip')){
        console.log(file)
        const zip = new AdmZip(dirPath + '/' + file);
        zip.extractAllTo(dirPath, true);
        return;
    }

    if(file.toString().endsWith('.rar')){

        const extractor = await createExtractorFromFile({
            filepath: dirPath + '/' + file,
            targetPath: dirPath,
        });
        const extracted = extractor.extract();
        [...extracted.files];


        return;
    }

    throw new Error('File not supported');


}

module.exports = {extractFile}