const express = require('express');
const router = express.Router();
const { updateModpack } = require('../utils/mc_files');
const middleware = require('../middleware/auth');


/* GET home page. */
router.get('/', middleware, async function(req, res, next) {
    res.render('index', {response : undefined})
});

module.exports = router;

