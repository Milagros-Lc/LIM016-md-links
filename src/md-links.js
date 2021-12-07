#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
var https = require('https');
let arrayObject = [], link = {};
let position, newArray;

function mdLinks(rutaConvert, options) {

  options == "--validate" ? options = true : options = false;
  let ruttaa = rutaConvert;
  console.log("es la ruta", ruttaa);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      recursiveFile(rutaConvert, function (err, data) {
        if (!!data) {
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
  console.log("dataaaaaaaaaa ", data);
  let textData = data.toString();
  let arrayData = textData.split("\\");
  let dataSlice = arrayData.slice(-2);
  let rutaMinificada= dataSlice.join("/");


  if (data.length == "") {
    console.log("Archivo vacio");
  }
  data.map(element => mdFile(element));

  function mdFile(element) {

    const exten = path.extname(element);
    if (exten == ".md") {
      console.log(path.basename(element));
      const x = path.basename(element);
      fs.readFile(element.replace(/\r?\n|\r/g, ""), function (err, datos) {
        if (err) {
          console.log(err);
        }
        const readInterface = readline.createInterface({
          input: fs.createReadStream(element),
        });
        readInterface.on('line', function (line) {
          position = line.search(/(?:http|https):\/\/(?:[^\/\r\n]+)(\/[^\r\n]*)?/g);
          let linea = line;
          if (position != -1) {
            let httpp = linea.split("(");
            if (httpp[1] != undefined) {
              newArray = httpp[1].split(")");

             
              link = {
                "href": newArray[0],
                "text": httpp[0],
                "file": "./"+rutaMinificada,
                "status": '',
                "sms": ''
              }
              https.get(newArray[0], function (res) {
                let result = res.statusCode;
                if (result === 200) {
                 
                  link.status = result;
                  link.sms = 'ok';       
             
                }
             
              }).on('error', function (e) {
                
                link.status = '404';
                link.sms = 'fail';
            
              });
              console.log(" ", link.file, " ", link.href, " ", link.status," ",link.sms, " ",link.text  );              
              //console.log("🚀linkiiiiiiiiiiiiiiiiiiii", link );
              //arrayObject.push(link);
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