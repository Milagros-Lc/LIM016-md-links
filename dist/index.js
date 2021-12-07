#!/usr/bin/env node
"use strict";

let option = {
  validate: ''
};

const mdLinks = require('./md-links');

const arg = process.argv.slice(2);
let ruta = '';

if (arg.length === 1) {
  ruta = arg[0];
  let priParam = '';
  chooseOption(ruta, {
    validate: priParam
  });
}

if (arg.length === 2) {
  let secondParam = '';

  if (arg[1] === '--validate') {
    secondParam = arg[1];
  } else if (arg[1] === '--stats') {
    secondParam = arg[1];
  }

  chooseOption(arg[0], {
    validate: secondParam
  });
}

function chooseOption(rutaConvert, option) {
  // console.log("siiiiiiiiiii",option.validate);
  mdLinks(rutaConvert, option.validate).then().catch(error => console.log(error));
} //---------------------------------------------------------------------------------------------------------------