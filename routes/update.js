const express = require('express');
const router = express.Router();

const multer = require('multer');
const mime = require('mime-types');
const {updateModpack} = require("../utils/mc_files");
const middleware = require("../middleware/auth");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'minecraft/');
    },
    filename: function (req, file, cb) {
        cb(null, 'modpack.zip');
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedMimeTypes = ['application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed'];
        if (allowedMimeTypes.includes(mime.lookup(file.originalname))){
            cb(null, true);
        } else {
            cb(new Error('Le fichier doit être un fichier ZIP'));
        }
    }
});

// Route pour servir la page EJS
router.get('/', middleware,(req, res) => {
    res.render('update.ejs', { message: null });
});

// Route pour recevoir les fichiers déposés
router.post('/upload', middleware, upload.array('file'), (req, res) => {
    updateModpack()
    res.render('update', { message: { type: 'success', text: 'Fichiers déposés avec succès' } });
});

module.exports = router;