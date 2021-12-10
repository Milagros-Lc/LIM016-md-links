#!/usr/bin/env node
//jdskndjn kakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
"use strict";

const fs = require('fs');

const path = require('path');

const readline = require('readline');

const https = require('https');

var colors = require('colors');

const {
  option
} = require('yargs');

let link = {};
let position,
    newArray,
    cont = 1,
    conta = 1,
    broken = 0;
let arraySum = [],
    arrayBroken = [],
    arrayLinks = [];

function mdLinks(rutaConvert, options, option2) {
  // console.log("ssssssssss",options,option2);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      recursiveFile(rutaConvert, function (err, data) {
        if (!!data) {
          console.log("dataaaaaa", data);
          resolve(recorrerFiles(data, options, option2));
          reject(err);
        } else {
          console.log("Ruta ingresada no existe");
        }
      });
    }, 2000);
  });
}

function recorrerFiles(data, options, option2) {
  if (data.length == "") {
    console.log("Directorio vacio");
  }

  data.map(element => mdFile(element));

  function mdFile(element) {
    const exten = path.extname(element);

    if (exten == ".md") {
      // fs.readFile(element, function (err, datos) {
      let textData = element.toString();
      let arrayData = textData.split("\\");
      let dataSlice = arrayData.slice(-2);
      let rutaRelativa = dataSlice.join("/");
      /*  if (err) {
         console.log(err);
       } */

      const readInterface = readline.createInterface({
        input: fs.createReadStream(element)
      });
      readInterface.on('line', function (line) {
        position = line.search(/(?:http|https):\/\/(?:[^\/\r\n]+)(\/[^\r\n]*)?/g);
        let linea = line;

        if (position != -1) {
          let httpp = linea.split("](");

          if (httpp[1] != undefined) {
            newArray = httpp[1].split(")");
            arraySum[cont - 1] = cont;
            arrayLinks[cont - 1] = newArray[0];
            cont = cont + 1;
            link = {
              "href": '',
              "text": '',
              "file": '',
              "status": '',
              "sms": ''
            };

            if (options == "") {
              link = {
                "href": newArray[0],
                "text": httpp[0].replace(/([|°<>!"#$%&/()=?:.*@¡\-'[;{}_])/g, ""),
                "file": "./" + rutaRelativa
              };
              console.log(link.file.green, " ", link.href.blue, " ", link.text);
            }

            if (options == "--validate") {
              funValidate(newArray[0], httpp[0].replace(/([|°<>!"#$%&/()=?:.*@¡\-'[;{}_])/g, ""), rutaRelativa).then(linkk => console.log(linkk.file.green, " ", linkk.href.blue, " ", linkk.status.yellow, " ", linkk.sms.green, " ", linkk.text)).catch(error => console.log(error));
            }
          }
        }
      }); // });
    }
  }

  if (options == "--stats") {
    totalLinks(arraySum).then(total => console.log("TOTAL: ".green + "", total)).catch(error => console.log(error));
    totalUniques(arrayLinks).then(unique => console.log("UNIQUE: ".green + "", unique)).catch(error => console.log(error));
  }
}

function totalLinks(arraySum) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(arraySum.pop());
      reject('error');
    }, 2000);
  });
}
/* function totalLinksRotos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      https.get(newArray, function (res) {

      }).on('error', function (e) {
        arrayBroken[conta - 1] = conta;
        console.log("aaaaaaaaaaaaaa", arrayBroken)
        conta = conta + 1;

        resolve(arrayBroken.pop());
        reject('error');

      });

    }, 5000)
  })
} */


function totalUniques(arrayLinks) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const unicos = arrayLinks.filter((valor, indice) => {
        return arrayLinks.indexOf(valor) === indice;
      });
      resolve(unicos.length);
      reject('error');
    }, 2000);
  });
}

function funValidate(newArray, httpp, rutaRelativa) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      https.get(newArray, function (res) {
        let result = res.statusCode;

        if (result === 200) {
          result = "200";
          link = {
            "href": newArray,
            "text": httpp,
            "file": "./" + rutaRelativa,
            "status": result,
            "sms": 'ok'
          };
          resolve(link);
          reject('error');
        }
      }).on('error', function (e) {
        arrayBroken[conta - 1] = conta;
        console.log("aaaaaaaaaaaaaaaaaaaa", arrayBroken);
        conta++;
        link = {
          "href": newArray,
          "text": httpp,
          "file": "./" + rutaRelativa,
          "status": '404',
          "sms": 'fail'
        };
        resolve(link);
        reject('error');
      });
    }, 2000);
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
        if (stat && stat.isDirectory()) {
          results.push(file);
          recursiveFile(file, function (err, res) {
            results = results.concat(res);
            if (! --pending) done(null, results);
          });
        } else {
          results.push(file);
          if (! --pending) done(null, results);
        }
      });
    });
  });
}

;
module.exports = mdLinks;