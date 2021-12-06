#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
var https = require('https');
let suma = [];

function mdLinks(rutaConvert, options) {

  options == "si" ? options = true : options = false;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      recursiveFile(rutaConvert.replace(/\r?\n|\r/g, ""), function (err, data) {
        if (data != "") {
          resolve(recorrerFiles(data, options));
        }
        else {
          reject('Ruta ingresada no existe');
        }
      });

    }, 2000)
  })

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
          /*  console: false */
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

              suma.push(newArray[0]);
              link = {
                "href": newArray[0],
                "text": httpp[0],
                "file": element,
                "status": ''
              }
              https.get(newArray[0], function (res) {
                let result = res.statusCode;
                if (result === 200) {
                  //return console.log("ok");
                  link.status = 'ok';
                  arrayObject.push(link);
                } 
                  console.log("🚀link", link );
              }).on('error', function (e) {
                // return console.log("fail");
                link.status = 'fail';
                arrayObject.push(link);
                console.log("🚀link", link );
              });
              // verifyUrl(newArray[0]);
              // arrayObject.push(link);
              // console.log("🚀link", link );
            }
          }
        });
      });
    }
  }
}

function verifyUrl(url) {
  https.get(url, function (res) {
    let result = res.statusCode;
    if (result === 200) {
      return console.log("ok");
    }
    /*   console.log("headers: ", res.headers);  
      res.on('data', function (d) {
        process.stdout.write(d);
      }); */
  }).on('error', function (e) {
    return console.log("fail");

  });
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

module.exports = mdLinks;