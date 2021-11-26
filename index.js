
/* module.exports = () => {

}; */

const fs = require('fs');
fs.readFile('./ejemplo.txt',function(error,datos) {
  if(error){
    console.log(error);
  }
  console.log(datos.toString());
});

