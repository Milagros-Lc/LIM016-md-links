#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const https = require('https');
const colors = require('colors');
const { option } = require('yargs');

let link = {};
let position, arrayHrefLinks=[], cont = 1, conta = 1;
let arrayTotalLinks = [], arrayBroken = [], arrayLinks = [], arrayMd = [];
let i = 1;

function mdLinks(rutaConvert, options, option2) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      recursiveFile(rutaConvert, function (err, data) {
        if (!!data) {
          resolve(recorrerFiles(data, options, option2));
          reject(err);
        }
        else {
          console.log("Ruta ingresada no existe");
        }
      });
    }, 2000)
  })
}


function recorrerFiles(data, options, option2) {

  if (options == "x" || options == "y") {
    console.log("error");
  }

  if (data.length == "") {
    console.log("Directorio vacio");
  }

  data.map(element => mdFile(element));

  function mdFile(element) {

    const exten = path.extname(element);

    if (exten == ".md") {
      arrayMd[i - 1] = i;
      i++;
      let rutaRelativa = convertPathRelativa(element);

      const readInterface = readline.createInterface({
        input: fs.createReadStream(element),
      });
      readInterface.on('line', function (line) {
        position = line.search(/(?:http|https):\/?/g);
        let linea = line;
        if (position != -1) {
          let arrayLinkEncontrado = linea.split("](");
          if (arrayLinkEncontrado[1] != undefined) {
            arrayHrefLinks = arrayLinkEncontrado[1].split(")");
            arrayLinks[cont - 1] = arrayHrefLinks[0];
            arrayTotalLinks[cont - 1] = cont;
            cont = cont + 1;

            if (options == "") {
              link = {
                "href": arrayHrefLinks[0],
                "text": arrayLinkEncontrado[0].replace(/([|#/().\-[;_])/g, ""),
                "file": "./" + rutaRelativa
              }
              console.log((link.file).green, " ", (link.href).blue, " ", link.text);
            }


            if (options == "--validate" && option2=="") {

              validateLinks(arrayHrefLinks[0], arrayLinkEncontrado[0].replace(/([|°<>!"#$%&/()=?:.*@¡\-'[;{}_])/g, ""), rutaRelativa)

                .then(linkk => console.log((linkk.file).green, " ", (linkk.href).blue, " ", (linkk.status).yellow, " ", (linkk.sms).green, " ", linkk.text))

                .catch(error => console.log(error))

            }
            if (option2 == "--validate" || option2=="--stats") {
            validateLinksRotos(arrayHrefLinks[0])
            .then(linksRotos =>console.log("Broken: ".green,linksRotos)
          
            )
            .catch(error => console.log(error))
            }
            
          }
         
        }
      });    
    }  
  }
 
  if (options == "--stats" || option2=="--stats") {
    totalLinks(arrayTotalLinks)
      .then(total => console.log("TOTAL: ".green + "", total))

      .catch(error => console.log(error))
    totalUniques(arrayLinks)
      .then(unique => console.log("UNIQUE: ".green + "", unique))
      .catch(error => console.log(error))
  }

  totalArchivosMd(arrayMd)
    .then(smsArchivos => console.log(smsArchivos))
    .catch(error => console.log(error))

}


function validateLinksRotos(arrayHrefLinks) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      https.get(arrayHrefLinks, function (res) {
        let result = res.statusCode;
        if (result === 200) {
        conta=conta+0;
        /* resolve();
        reject('error'); */
        }
      }).on('error', function (e) {
        arrayBroken[conta - 1] = conta;
        conta++;
        let respuesta=arrayBroken.pop();
        resolve(respuesta);
        reject('error');

      });

    }, 2000)
  })
}

function totalArchivosMd(arrayMd) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (arrayMd.length == 0) {
        const smsMd = "Archivos .md no encontrados";
        resolve(smsMd);
        reject('error');
      }

    }, 2000)
  })
}
function totalLinks(arrayTotalLinks) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(arrayTotalLinks.pop());
      reject('error');
    }, 2000)
  })
}

function totalUniques(arrayLinks) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const unicos = arrayLinks.filter((valor, indice) => {
        return arrayLinks.indexOf(valor) === indice;
      }
      );
      resolve(unicos.length);
      reject('error');

    }, 2000)
  })
}

function validateLinks(arrayHrefLinks, arrayLinkEncontrado, rutaRelativa) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      https.get(arrayHrefLinks, function (res) {
        let result = res.statusCode;
        if (result === 200) {
          result = "200";
          link = {
            "href": arrayHrefLinks,
            "text": arrayLinkEncontrado,
            "file": "./" + rutaRelativa,
            "status": result,
            "sms": 'ok'
          }
          resolve(link);
          reject('error');
        }

      }).on('error', function (e) {
      /*   arrayBroken[conta - 1] = conta;
        console.log("aaaaaaaaaaaaaaaaaaaa", arrayBroken);
        conta++; */
        link = {
          "href": arrayHrefLinks,
          "text": arrayLinkEncontrado,
          "file": "./" + rutaRelativa,
          "status": '404',
          "sms": 'fail'
        }

        resolve(link);

        reject('error');

      });

    }, 2000)
  })
}

function convertPathRelativa(element) {
  let textData = element.toString();
  let arrayData = textData.split("\\");
  let dataSlice = arrayData.slice(-2);
  let rutaRelativa = dataSlice.join("/");
  return rutaRelativa;
};

function recursiveFile(dir, done) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
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
