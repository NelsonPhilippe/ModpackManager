const express = require('express');
const router = express.Router();
const path = require('path');
const {checkFiles} = require("../utils/mc_files");

router.get('/todownload', function (req, res) {
    const pack = req.body.pack;

    const filesToDownload = checkFiles(pack);

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