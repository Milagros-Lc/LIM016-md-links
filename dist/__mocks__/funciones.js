"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalLinks = void 0;

function convertPathRelativa(element) {
  let textData = element.toString();
  let arrayData = textData.split("\\");
  let dataSlice = arrayData.slice(-2);
  let rutaRelativa = dataSlice.join("/");
  return rutaRelativa.toString();
}

;
const totalLinks = jest.fn(arrayLinks => Promise.resolve({}));
exports.totalLinks = totalLinks;

function totalArchivosMd(arrayMd) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (arrayMd.length == 0) {
        const smsMd = "Archivos .md no encontrados";
        resolve(smsMd);
        reject('error');
      }
    }, 2000);
  });
}
/* module.exports = {
  
   convertPathRelativa

};
 */