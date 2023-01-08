const express = require('express');
const router = require('./routes/rutas');
const app = express();

// Variables locales
app.use( (req, res, next)=> {
    res.locals.variable_local = "Creada desde del index";
    next();
});

// Para paginas web estaticas
app.use(express.static(__dirname + '/assets'));

// #########################################
// Handlebars
const {create} = require('express-handlebars');
const hbs = create({
    defaultLayout: 'main_layout',
    extname: '.hbs', 
    helpers: require('./views/helpers/handlebars'),
    partialsDir: ['views/components']
});
// Configuracion de motor de plantillas handlebar
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views')
// #########################################

app.use(router);
app.use( (req, res) => {
    res.status(404).render('errors/404', {
        tituloPagina: "Pagina no encontrada"
    });
})

app.listen(3000, () => 
    console.log('Aplicacion corriendo en puerto 3000!')
);