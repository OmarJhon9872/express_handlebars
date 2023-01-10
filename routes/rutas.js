const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController')
const formularioController = require('../controllers/formularioController')

router.get('/', homeController.home);
router.get('/formularios', formularioController.home);

router.get('/formularios/normal', formularioController.normal);
router.post('/formularios/normal', formularioController.normal_post);

module.exports = router;