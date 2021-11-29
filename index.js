
/* module.exports = () => {
}; */
/* const mdLinks = require("md-links");
 */
//--------------------------------------------------

const fs = require('fs');
const path = require('path');


let rutaConvert;
console.log("Por favor, ingrese ruta");
const ruta = process.openStdin();
ruta.addListener("data", function (r) {
  rutaConvert = r.toString();

  recursiveFile(rutaConvert.replace(/\r?\n|\r/g, ""), function (err, data) {
    if (err) {
      console.log("Ruta no encontrada");
    }
    console.log(data)
  
  });
});

function recursiveFile(dir, done) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        // If directory, execute a recursive call
        if (stat && stat.isDirectory()) {
          // Add directory to array [comment if you need to remove the directories from the array]
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

















