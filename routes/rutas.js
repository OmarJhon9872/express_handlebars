const express = require('express');
const router = express.Router();

// Validaciones con express
const {body} = require('express-validator');

const homeController = require('../controllers/homeController')
const formularioController = require('../controllers/formularioController')

router.get('/', homeController.home);
router.get('/formularios', formularioController.home);

router.get('/formularios/normal', formularioController.normal);

router.get('/formularios/upload', formularioController.upload);
router.post('/formularios/upload+', formularioController.upload_post);

// Validaciones con express
// Path - middleware - metodo de procesamiento
router.post('/formularios/normal', [
    body('nombre', 'Ingrese un nombre valido')
        .trim().notEmpty().escape(),

    body('correo')
        .trim().notEmpty().withMessage('Email requerido').escape()
        .isEmail().withMessage('No es de tipo email')
        .normalizeEmail().withMessage('Email no valido'),

    body('telefono')
        .trim().notEmpty().withMessage('Telefono requerido').escape()
        .isNumeric().withMessage('No es tipo numerico')
], formularioController.normal_post);

module.exports = router;