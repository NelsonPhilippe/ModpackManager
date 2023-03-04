const express = require('express');
const router = express.Router();
const path = require('path');
const {checkFiles} = require("../utils/mc_files");
const fs = require("fs");


router.get('/request/modpack', async function (req, res) {
    const packData = await fs.promises.readFile('pack.json');
    const packList = JSON.parse(packData.toString());

    console.log(packList);

    res.status(200).json(packList);
});

router.post('/todownload', async function  (req, res) {
    const pack = req.body;

    console.log(pack)

    if (pack.length === 0){
        const packData = await fs.promises.readFile('pack.json');
        const packList = JSON.parse(packData.toString());
        res.status(200).json(packList)
        return
    }

    const filesToDownload = await checkFiles(pack);
    console.log(filesToDownload)
    res.status(200).json(filesToDownload);
});

router.get('/download/:filename', function(req, res) {
    const file = req.params.filename;
    const filepath = path.join(__dirname, '../minecraft', file);

    res.download(filepath, function(err) {
        if (err) {
            console.log(err);
            res.status(404).send('Fichier non trouvé');
        }
    });
});

module.exports = router;