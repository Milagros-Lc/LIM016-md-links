#!/usr/bin/env node
let option = { validate: false }

const mdLinks = require('./md-links');
const arg = process.argv.slice(2);

let ruta = '';

if (arg.length === 1) {
    ruta = arg[0];
  chooseOption(ruta, option.validate);
}
if (arg.length === 2) {
  let secondParam = '';
  if (arg[1] === '--validate') {
    secondParam = arg[1];
  } else if (arg[1] === '--stats') {
    secondParam = arg[1];
  }
  chooseOption(arg[0], { validate: arg[1] });
}

function chooseOption(rutaConvert, option) {
 
    mdLinks(rutaConvert, option.validate)
      .then()
      .catch(error => console.log(error))

}
//---------------------------------------------------------------------------------------------------------------














