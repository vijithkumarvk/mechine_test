let router = require('express').Router();
var userController = require('../controllers/userController');
var csvController = require('../controllers/csvController');

const multer = require('multer');
const upload = multer({ dest: process.env.TEMP_STORAGE });

router.route('/user')
    .get(userController.list)
    .post(userController.insert)

router.route('/mail')
    .post(upload.single('file'), csvController.send)

module.exports = router;