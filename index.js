
/* module.exports = () => {
}; */
/* const mdLinks = require("md-links");
 */

const fs = require('fs');
const path = require('path');

console.log("Por favor, ingrese ruta");
const ruta = process.openStdin();
ruta.addListener("data", function (r) {
  const rutaConvert = r.toString();
  fs.readdir(rutaConvert.replace(/\r?\n|\r/g, ""), function (err, datos) {
    if (err) {
      console.log("Ruta no encontrada", err);
    }
    const arrayFiles = datos.toString().split(",");
    console.log(arrayFiles);
    if (arrayFiles.length > 1) {
      for (let i = 0; i < arrayFiles.length; i++) {
        fs.readdir(rutaConvert.replace(/\r?\n|\r/g, "") + "/" + arrayFiles[i].replace(/\r?\n|\r/g, ""), function (error, datos) {
          if (error) {
            console.log("Ruta no encontrada", error);
          }
          const arrayFiles2 = datos.toString().split(",");
          console.log(arrayFiles2);
          for (let i = 0; i < arrayFiles2.length; i++) {
            const exten = path.extname(arrayFiles2[i]);
            if (exten == ".md") {
              console.log(arrayFiles2[i]);
            }
          }
        });
      }
    }
  });
});

























