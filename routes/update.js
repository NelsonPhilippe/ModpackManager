const express = require('express');
const router = express.Router();

const multer = require('multer');
const mime = require('mime-types');
const {updateModpack} = require("../utils/mc_files");
const middleware = require("../middleware/auth");
const {log} = require("debug");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'minecraft/');
    },
    filename: function (req, file, cb) {


        if(file.originalname.endsWith('.zip')){
            cb(null, 'modpack.zip');
        }
        if(file.originalname.endsWith('.rar')){
            cb(null, 'modpack.rar');
        }
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(mime.lookup(file.originalname))
        const allowedMimeTypes = ['application/zip', 'application/x-zip-compressed', 'application/gzip', 'application/vnd.rar'];
        if (allowedMimeTypes.includes(mime.lookup(file.originalname))){
            cb(null, true);
        } else {
            cb(console.log('Le fichier doit être un fichier ZIP ou un RAR'));
        }
    },
    limit: {
        files: 1,
        fileSize: 5000 * 1024 * 1024
    }
});

// Route pour servir la page EJS
router.get('/', middleware,(req, res) => {
    res.render('update.ejs', { message: null });
});

// Route pour recevoir les fichiers déposés
router.post('/upload', middleware, upload.single('file'), (req, res) => {
    // req.file.originalname.endWith('.zip') ? updateModpack('zip') : updateModpack('rar');

    const fileName = req.file.originalname;
    fileName.includes('.zip') ? updateModpack('zip') : updateModpack('rar');
    res.status(200).render('update', {message: 'success'});
});

module.exports = router;