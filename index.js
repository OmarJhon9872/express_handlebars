const express = require('express');
const router = require('./routes/rutas');
const app = express();

// Para paginas web estaticas
//app.use(express.static('pag_estaticas'));
// #########################################
// Handlebars
const {create} = require('express-handlebars');
const hbs = create({
    defaultLayout: 'main_layout',
    extname: '.hbs'
});
// Configuracion de motor de plantillas handlebar
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views')
// #########################################

app.use(router);

app.listen(3000, () => 
    console.log('Aplicacion corriendo en puerto 3000!')
);