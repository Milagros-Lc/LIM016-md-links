
/* module.exports = () => {
}; */
/* const mdLinks = require("md-links");
 */
//--------------------------------------------------

const fs = require('fs');
const path = require('path');
const readline = require('readline');

let rutaConvert;
console.log("Por favor, ingrese ruta");
const ruta = process.openStdin();
ruta.addListener("data", function (r) {
  rutaConvert = r.toString();

  recursiveFile(rutaConvert.replace(/\r?\n|\r/g, ""), function (err, data) {
    if (err) {
      console.log("Ruta no encontrada");
    }else
      recorrerFiles(data);
  });
});
function recorrerFiles(data) {
  if (data.length == "") {
    console.log("Archivo vacio");
  }

  data.map(element => mdFile(element));

  function mdFile(element) {
    let position;
    let l;
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
        readInterface.on('line', function(line) {
        /*   console.log("se lee linea ",line.replace(/(?:http|https):\/\/(?:[^\/\r\n]+)(\/[^\r\n]*)?/g,"mama)")); */
          position=line.search(/(?:http|https):\/\/(?:[^\/\r\n]+)(\/[^\r\n]*)?/g);
          let linea=line;
         /*  console.log("aaaaaaaaaa",position); */
          if(position!=-1){

            let httpp=linea.split("](");
           /*  console.log("est es mi primer",httpp); */
             l=httpp[1].split(")");
            /*   console.log("auxilioooo",l); */

        /*     let y=l.split(")");
 */
          console.log("Obteniendo  enlace",l[0]);  
          }
      });
        //aqui termino
      });
    }
  }
}

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

















