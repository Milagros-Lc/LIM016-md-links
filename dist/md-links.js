"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = exports.getArrLinks = void 0;

var _funciones = require("./funciones");

var _validate = require("./validate.js");

const getArrLinks = route => new Promise(resolve => {
  const arrPathFiles = (0, _funciones.getPathsFromDirectory)(route);
  const arrMd = (0, _funciones.searchFilesMd)(arrPathFiles);
  const arrLinks = arrMd.map(elem => (0, _funciones.getLinks)((0, _funciones.getContent)(elem), elem));
  let newArr = [];
  arrLinks.forEach(element => {
    element.forEach(elem => {
      newArr.push(elem);
    });
  });
  resolve(newArr);
});

exports.getArrLinks = getArrLinks;

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  let newPath = path;

  if ((0, _funciones.isValidPath)(path)) {
    if (!(0, _funciones.isAbsolutePath)(path)) newPath = (0, _funciones.convertPathToAbsolute)(path);

    if (options === undefined || !options.validate) {
      return getArrLinks(newPath).then(response => resolve(response)).catch(err => reject(err));
    }

    if (options.validate === true) {
      return getArrLinks(newPath).then(res => {
        (0, _validate.validateLinks)(res).then(resp => resolve(resp));
      }).catch(err => reject(err));
    }
  } else {
    console.log('La ruta ingresada no existe');
  }
});

exports.mdLinks = mdLinks;