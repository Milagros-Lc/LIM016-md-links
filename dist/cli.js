#!/usr/bin/env node
"use strict";

var _mdLinks = require("./md-links");

var _validate = require("./validate");

const arg = process.argv.slice(2);

const colors = require('colors');

const figlet = require('figlet');

const msn = msn => new Promise(resolve => {
  let nuevo = figlet.textSync(msn, {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });
  resolve(nuevo);
});

if (arg.length === 1) {
  msn('MD - LINKS').then(mensaje => console.log(mensaje.cyan));
  (0, _mdLinks.mdLinks)(arg[0]).then(resArray => {
    resArray.forEach(elem => {
      const text = elem.text;
      const href = elem.href;
      const file = elem.file;
      console.log(file.blue, (" ", text).green, " ", href);
    });
  });
}

if (arg.length === 2) {
  msn('MD - LINKS').then(mensaje => console.log(mensaje.cyan));

  if (arg[1] === '--validate') {
    (0, _mdLinks.mdLinks)(arg[0], {
      validate: true
    }).then(resArray => {
      resArray.forEach(elem => {
        const href = elem.href;
        const file = elem.file;
        const http = elem.status;
        const sms = elem.statusText;
        const text = elem.text;
        console.log(file.blue, (" ", text).green, (" ", href).cyan, " ", http, (" ", sms).magenta);
      });
    });
  } else if (arg[1] === '--stats') {
    (0, _mdLinks.mdLinks)(arg[0], {
      validate: true
    }).then(res => {
      console.log((0, _validate.totalLinks)(res));
      console.log((0, _validate.uniqueLinks)(res));
    });
  }
}

if (arg.length === 3) {
  if (arg[1] === "--validate" && arg[2] === "--stats" || arg[1] === "--stats" && arg[2] === "--validate") {
    msn('MD - LINKS').then(mensaje => console.log(mensaje.cyan));
    (0, _mdLinks.mdLinks)(arg[0], {
      validate: true
    }).then(res => {
      console.log((0, _validate.totalLinks)(res));
      console.log((0, _validate.uniqueLinks)(res));
      let status = [];
      res.map(element => {
        status.push(element.statusText);
      });
      const broken = status.filter(elem => elem === 'FAIL').length;
      console.log(`BROKEN: ${broken}`);
    });
  } else {
    console.log("Error comands");
  }
}