#!/usr/bin/env node
"use strict";

const fun = require('./funciones');

function mdLinks(rutaConvert, options, option2) {
  return new Promise((resolve, reject) => {
    fun.recursiveFile(rutaConvert, function (err, data) {
      if (!!data) {
        resolve(fun.recorrerFiles(data, options, option2));
        reject(err);
      } else {
        console.log("Ruta ingresada no existe");
      }
    });
  });
}

module.exports = mdLinks;