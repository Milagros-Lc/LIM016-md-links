#!/usr/bin/env node

import { mdLinks } from './md-links'
import { getTotalLinks, getUniqueLinks } from './validate'
const arg = process.argv.slice(2)

if(arg.length === 1){
  //console.log(arg[0]);
  mdLinks(arg[0])
  .then(ruta => console.log(ruta))
}
if(arg.length === 2){
  if(arg[1] === '--validate'){
    mdLinks(arg[0], {validate: true})
    .then(res => console.log(res))
  } else if(arg[1] === '--stats'){
    mdLinks(arg[0], {validate: true})
    .then((res) => {
      console.log(getTotalLinks(res));
      console.log(getUniqueLinks(res));
    })
  }
 
}
if(arg.length === 3){
if((arg[1]==="--validate" || arg[1]==="--stats")  && (arg[2]==="--stats" || arg[2]==="--validate") ){

  mdLinks(arg[0], {validate: true})
    .then((res) => {
      console.log(getTotalLinks(res));
      console.log(getUniqueLinks(res));
      let arrStatus = [];
      res.map((elem) => {
        arrStatus.push(elem.statusText)
      });
      const statusFail = (arrStatus.filter(elem => elem === 'Fail')).length;
      console.log(`BROKEN: ${statusFail}`);
    })
}
console.log("error comands");


}


 
