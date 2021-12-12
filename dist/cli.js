#!/usr/bin/env node
"use strict";

var _mdLinks = require("./md-links");

var _validate = require("./validate");

const arg = process.argv.slice(2);

if (arg.length === 1) {
  //console.log(arg[0]);
  (0, _mdLinks.mdLinks)(arg[0]).then(ruta => console.log(ruta));
}

if (arg.length === 2) {
  if (arg[1] === '--validate') {
    (0, _mdLinks.mdLinks)(arg[0], {
      validate: true
    }).then(res => console.log(res));
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
  if (arg[1] === "--validate" || arg[2] === "--stats" || arg[1] === "--stats" || arg[2] === "--validate") {
    (0, _mdLinks.mdLinks)(arg[0], {
      validate: true
    }).then(res => {
      console.log((0, _validate.totalLinks)(res));
      console.log((0, _validate.uniqueLinks)(res));
      let status = [];
      res.map(element => {
        status.push(element.statusText);
      });
      const broken = status.filter(elem => elem === 'Fail').length;
      console.log(`BROKEN: ${broken}`);
    });
  }
}