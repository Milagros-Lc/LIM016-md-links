#!/usr/bin/env node
//import mdLinks from './md-links';
const mdLinks = require('./md-links');
const arg = process.argv.slice(2);
let ruta = '';

if(arg.length === 1){
  console.log(arg[0]);
  ruta = arg[0]; 
  chooseOption(ruta);
}
if(arg.length === 2){
  let secondParam = '';
  if(arg[1] === '--validate'){
    secondParam = arg[1];
  } else if(arg[1] === '--stats'){ 
    secondParam = arg[1];
  }
  chooseOption(arg[0], { validate: arg[1]});
}
/* if(arg.length === 3){
    console.log(arg[0], arg[1], arg[2]);
} */

let option = { validate: "" }
let rutaConvert;
/* console.log("Por favor, ingrese ruta");
let ruta = process.openStdin();
ruta.addListener("data", function (ruta2) {
  if (ruta2.toString().replace(/\r?\n|\r/g, "") == "") {
    console.log("ingrese ruta");
    ruta2 = process.openStdin();
  } else {
    ruta.removeAllListeners();
    rutaConvert = ruta2.toString().replace(/\r?\n|\r/g, "");
    chooseOption(rutaConvert);
  }
}); */

function chooseOption(rutaConvert, option) {

 // console.log("Por favor, ingrese opción (si - no) para verificar links");
  //let options = process.openStdin();
 // options.addListener("data", function (opt) {
    //option.validate = opt.toString().replace(/\r?\n|\r/g, "");

    if (option.validate == "") {
      //console.log("ingrese opcion");
      // opt = process.openStdin();
    } else
      if (option.validate == "si" || option.validate == "no") {

        mdLinks(rutaConvert, option.validate)
          .then( )
          .catch(error => console.log(error))

      } else {
        console.log("ingrese si/no opcion");
        // option.validate = process.openStdin();
      }
 // });
}
//---------------------------------------------------------------------------------------------------------------
/* const fs = require('fs');
const path = require('path');
//leer un archivo....
console.log("Por favor, ingrese ruta");
var ruta = process.openStdin();
ruta.addListener("data", function (d) {
 const m = d.toString();
  fs.readFile(m.replace(/\r?\n|\r/g, ""),function (err,datos){
    if (err) {
      console.log(err);
    }
    console.log(datos.toString());

  });
});


 */

/* let rutaConvert;
console.log("Por favor, ingrese ruta");
const ruta = process.openStdin();
ruta.addListener("data", function (r) {
  rutaConvert = r.toString();
  fs.readdir(rutaConvert.replace(/\r?\n|\r/g, ""), function (err, datos) {
    if (err) {
      console.log("Ruta no encontrada");
    } else {
      const arrayFiles = datos.toString().split(",");

      if (arrayFiles.length > 1) {
        recorrer(arrayFiles);


      }

      if (arrayFiles.length == 0 || arrayFiles[0] == "") {
        console.log("el archivo está vacio")
      } else
        console.log("Archivos encontrados: ", arrayFiles);
    }
  });
});

function recorrer(arrayFiles) {
  arrayFiles.map(e => moreFiles(e));
}


function moreFiles(arrayFiles) {
  fs.readdir(rutaConvert.replace(/\r?\n|\r/g, "") + "/" + arrayFiles.replace(/\r?\n|\r/g, ""), function (error, datos) {
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



 */

















