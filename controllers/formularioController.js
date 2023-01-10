module.exports.home = (req, res) => {
    return res.render("formularios/home", {
        tituloPagina: "Formularios"
    });
}
// ###################################################
module.exports.normal = (req, res) => {
    return res.render("formularios/normal", {
        tituloPagina: "Formularios"
    });
}
module.exports.normal_post = (req, res) => {
    const {nombre, correo, telefono} = req.body; //form-data

    res.send(`Nombre: ${nombre}, correo: ${correo}, telefono: ${telefono}`)
}
// ###################################################
// ###################################################