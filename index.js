
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
 fs.readdir(rutaConvert.replace(/\r?\n|\r/g,"") , function (err,datos){
  if (err) {
    console.log("Ruta no encontrada",err);
  }
  console.log(datos.toString());  
 });
});

























