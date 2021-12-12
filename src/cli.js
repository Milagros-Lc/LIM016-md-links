#!/usr/bin/env node

import { mdLinks } from './md-links'
import { totalLinks, uniqueLinks } from './validate'
const arg = process.argv.slice(2)

const figlet = require('figlet');
const msn = () => new Promise((resolve) => {  
  resolve( console.log((figlet.textSync("mensaje", {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })).cyan));
});
msn()
.then();

if (arg.length === 1) {
  mdLinks(arg[0])
    .then(ruta => console.log(ruta))

}
if (arg.length === 2) {
  if (arg[1] === '--validate') {
    mdLinks(arg[0], { validate: true })
      .then(res => console.log(res))
  } else if (arg[1] === '--stats') {
    mdLinks(arg[0], { validate: true })
      .then((res) => {
        console.log(totalLinks(res));
        console.log(uniqueLinks(res));
      })
  }
}
if (arg.length === 3) {
  if ((arg[1] === "--validate" && arg[2] === "--stats") || (arg[1] === "--stats" && arg[2] === "--validate")) {

    mdLinks(arg[0], { validate: true })
      .then((res) => {
        console.log(totalLinks(res));
        console.log(uniqueLinks(res));
        let status = [];
        res.map((element) => {
          status.push(element.statusText)
        });
        const broken = (status.filter(elem => elem === 'Fail')).length;
        console.log(`BROKEN: ${broken}`);
      })
  }
  else {
    console.log("Error comands");
  }

}



