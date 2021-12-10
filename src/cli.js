#!/usr/bin/env node
let option = { validate: '' }
const mdLinks = require('./md-links');
const figlet = require('figlet');

const arg = process.argv.slice(2);

const msn = msn => {
  console.log((figlet.textSync(msn, {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'

  })).cyan);
}
msn('MD - LINKS');

let secondParam = '';
let tercerParam = '';
let ruta = '';

if (arg.length === 1) {
  ruta = arg[0];
  chooseOption(ruta, { validate: secondParam }, { validate: tercerParam });
}
if (arg.length === 2) {
 
  if (arg[1] === '--validate') {
    secondParam = arg[1];
  } else if (arg[1] === '--stats') {
    secondParam = arg[1];
  }else{
    secondParam = "x";
  }
  chooseOption(arg[0], { validate: secondParam },{ validate: tercerParam });
}
if (arg.length === 3) {

  if (arg[1] === '--validate' && arg[2] === '--stats') {
    secondParam = arg[1];
    tercerParam = arg[2];
  } else if (arg[1] === '--stats' && arg[2] === '--validate') {
    secondParam = arg[1];
    tercerParam = arg[2];
  }else{
    secondParam = "x";
    tercerParam = "y";
  }
  chooseOption(arg[0], { validate: secondParam }, { validate: tercerParam });
}

function chooseOption(rutaConvert, option, option2) {
  mdLinks(rutaConvert, option.validate,option2.validate)
    .then()
    .catch(error => console.log(error))
}
//---------------------------------------------------------------------------------------------------------------









