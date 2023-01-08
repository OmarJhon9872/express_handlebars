module.exports.home = (req, res) => {
    let nombre = "Jonathan";
    let paises = [
        {nombre: 'Mexico', nic: "mx"},
        {nombre: 'Argentina', nic: "ar"},
        {nombre: 'Canada', nic: "cd"},
    ]

    // hbs detectado automaticamente
    return res.render('home/home', {
        tituloPagina: "Inicio",
        nombre,
        paises
    });
}
