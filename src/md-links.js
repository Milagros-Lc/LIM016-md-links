import { pathValidate, pathAbsoluta, convertPathToAbsolute } from './funciones';
import { lisDirectorio, searchFilesMd } from './funciones';
import { obtenerLinks, obtenerContenido } from './funciones';
import { validateLinks } from './validate.js'

export const getArrLinks = (ruta) => new Promise((resolve) => {
  const arrPathFiles = lisDirectorio(ruta);
  const arrMd = searchFilesMd(arrPathFiles);
  const arrLinks = arrMd.map(elem => obtenerLinks(obtenerContenido(elem), elem));
  let newArr = [];
  arrLinks.forEach(element => {
    element.forEach(elem => {
      newArr.push(elem);
   
    })
  })
  resolve(newArr);
});

export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  setTimeout(() => {
    let newPath = path;
    if (pathValidate(path)) {
      if (!pathAbsoluta(path)) newPath = convertPathToAbsolute(path);
      if (options === undefined || !options.validate) {
        return getArrLinks(newPath)
          .then(resArray => {
            resolve(resArray);

          })
          .catch(err => reject(err))
      }
      if (options.validate === true) {
        return getArrLinks(newPath)
          .then((res) => {
            validateLinks(res)
              .then(resp => resolve(resp ));

          })
          .catch(err => reject(err))
      }
    } else {
      console.log('La ruta ingresada no existe');
    }
  }, 1000);
});