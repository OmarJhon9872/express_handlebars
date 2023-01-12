const {validationResult} = require('express-validator');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');


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
    const errors_validations = validationResult(req);
    if(!errors_validations.isEmpty()){
        
        // Errores de validacion, dependencia "connect-flash"
        req.flash('cssFlash', 'danger');
        req.flash('mensajeFlash', errors_validations.array());
        
        return res.redirect('/formularios/normal');
    }


    const {nombre, correo, telefono} = req.body; //form-data

    res.send(`Nombre: ${nombre}, correo: ${correo}, telefono: ${telefono}`)
}
// ###################################################
module.exports.upload = (req, res) => {
    return res.render("formularios/upload", {
        tituloPagina: "Formularios upload"
    });
}
module.exports.upload_post = (req, res) => {
    const form = new formidable.IncomingForm();
    form.maxFileSize = 50*1024*1024; //5mb

    form.parse(req, async (err, fields, files) => {
        try{
            /* Si hay un error al procesar el formulario */
            if(err){
                throw new Error("Se produjo un error: " + err);
            }
            /* Obtenemos el formulario enviado */
            const file = files.foto;
            
            /* Si no hay nombre de archivo se retorna un error */
            if(file.originalFilename === ""){
                throw new Error("No se subio ninguna imagen");
            }
            
            /* Validamos mimetypes */
            const imageAllowedTypes = [
                "image/jpeg",
                "image/png",
                "image/gif"
            ];
            if(!imageAllowedTypes.includes(file.mimetype)){
                throw new Error("Mimetype no permitido");
            }
            
            // Verificamos el tamaño de archivo
            if(file.size > 100 * 1024 * 1024){
                throw new Error("Tamaño maximo superado");
            }

            // Asignamos el tiempo en que se guardara el archivo
            var tiempo = Math.round(+new Date() / 1000);

            // Asignamos extension segun el mimetype
            switch(file.mimetype){
                case "image/jpeg":
                    nombreFinal = tiempo + ".jpg";
                    break;
                case "image/png":
                    nombreFinal = tiempo + ".png";
                    break;
                case "image/gif":
                    nombreFinal = tiempo + ".gif";
                    break;
            }

            // Se guarda
            const dirFile = path.join(__dirname, `../assets/uploads/${nombreFinal}`);

            // Guardamos el archivo
            fs.copyFile(file.filepath, dirFile, (err) => {
                if(err) throw new Error("Algo fallo al guardar el archivo");
            });

            // Errores de validacion, dependencia "connect-flash"
            req.flash('cssFlash', 'success');
            req.flash('mensajeFlash', [{msg: 'El archivo se guardo correctamente'}]);

            return res.redirect('/formularios/upload');

        }catch(err){
            // Errores de validacion, dependencia "connect-flash"
            req.flash('cssFlash', 'danger');
            req.flash('mensajeFlash', [{msg: err.message}]);

            return res.redirect('/formularios/upload');
        }
    });   
}
// ###################################################
// ###################################################