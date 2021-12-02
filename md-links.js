
const fs = require('fs');

const path = require('path');
const readline = require('readline');

const mdLinks = function (rutaConvert, options) {

  options == "si" ? options = true : options = false;

  recursiveFile(rutaConvert.replace(/\r?\n|\r/g, ""), function (err, data) {
    if (err) {
      console.log("Ruta no encontrada");
    } else
      recorrerFiles(data, options);
  });

}
function recorrerFiles(data, options) {

  if (data.length == "") {
    console.log("Archivo vacio");
  }
  data.map(element => mdFile(element));

  function mdFile(element) {
    let arrayObject = [];
    let position;
    let newArray;

    let link = {};
    const exten = path.extname(element);
    if (exten == ".md") {
      console.log(path.basename(element));
      const x = path.basename(element);
      /*    console.log("ruta nueva", element); */
      fs.readFile(element.replace(/\r?\n|\r/g, ""), function (err, datos) {
        if (err) {
          console.log(err);
        }
        /*  console.log(datos.toString()); */
        //aqui empiezoo
        const readInterface = readline.createInterface({
          input: fs.createReadStream(element),
          /*   output: process.stdout, */
          console: false
        });
        readInterface.on('line', function (line) {
          /*   console.log("se lee linea ",line.replace(/(?:http|https):\/\/(?:[^\/\r\n]+)(\/[^\r\n]*)?/g,"probando)")); */
          position = line.search(/(?:http|https):\/\/(?:[^\/\r\n]+)(\/[^\r\n]*)?/g);
          let linea = line;
          /*  console.log("aaaaaaaaaa",position); */
          if (position != -1) {
            let httpp = linea.split("](");
            if (httpp[1] != undefined) {
              /*  console.log("est es mi htpp", httpp); */
              newArray = httpp[1].split(")");
              console.log("Obteniendo  enlace", newArray[0]);

              link = {
                "href": newArray[0],
                "text": httpp[0],
                "file": element,
              }

              arrayObject.push(link);
              console.log("🚀 ~ file: md-links.js ~ line 67 ~ arrayObject", arrayObject)
        
             

            }
          }
        });
      });
    }
  }
}
//verificar url

//fin de verificar




function recursiveFile(dir, done) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
             
        //Si es directorio, ejecuta una llamada recursiva
        if (stat && stat.isDirectory()) {
          results.push(file);
          recursiveFile(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);

          if (!--pending) done(null, results);
        }
      });
    });
  });
};

module.exports = mdLinks;