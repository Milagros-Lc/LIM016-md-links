#!/usr/bin/env node
const fun  = require('./funciones');

function mdLinks(rutaConvert, options, option2) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fun.recursiveFile(rutaConvert, function (err, data) {
        if (!!data) {
          resolve(fun.recorrerFiles(data, options, option2));
          reject(err);
        }
        else {
          console.log("Ruta ingresada no existe");
        }
      });
    }, 2000)
  })
}

module.exports = mdLinks;

