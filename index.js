const express = require('express');
const router = require('./routes/rutas');
const app = express();
const csrf = require('csurf');

// Sesiones flash para mostrar ayuda en formularios erroneos
const flash = require('connect-flash');
// Iniciamos variables de session flash
app.use(flash());//Aparte en variables locales se configura token (abajo)

// #########################################
// Middleware para recibir datos de formularios
app.use(express.urlencoded({extended: true}));

// #########################################
// Configuracion de sesiones
const session = require('express-session');
app.use(session({
    secret: "12312321321321312",
    resave: false,
    saveUninitialized: false,
    name: "secret-name",
    cookie: {
        expires: 600000
    }
}));

// #########################################
// Configuracion CSRF
app.use(csrf({
    cookie: false,
})); //Aparte en variables locales se configura token (abajo)

// #########################################
// Variables locales
app.use( (req, res, next)=> {
    res.locals.variable_local = "Creada desde del index";
    res.locals.csrfToken = req.csrfToken();

    res.locals.cssFlash = req.flash('cssFlash')
    res.locals.mensajeFlash = req.flash('mensajeFlash')
    next();
});

// #########################################
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

// Cache en las vistas
// app.enable('view cache');
app.set('views', './views')
// #########################################

// Rutas
app.use(router);
// Si se pasa por parametro la variable layout en false descarta
// el layout de "views/layouts/main_layout.hbs"
app.use( (req, res) => {
    res.status(404).render('errors/404', {
        tituloPagina: "Pagina no encontrada",
        layout: false
    });
})

app.listen(3000, () => 
    console.log('Aplicacion corriendo en puerto 3000!')
);