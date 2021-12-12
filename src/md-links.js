import { isValidPath, isAbsolutePath, convertPathToAbsolute } from './funciones';
import { getPathsFromDirectory, searchFilesMd } from './funciones';
import { getLinks, getContent } from './funciones';
import { validateLinks } from './validate.js'

export const getArrLinks = (route) => new Promise((resolve) => {
  const arrPathFiles = getPathsFromDirectory(route);
  const arrMd = searchFilesMd(arrPathFiles);
  const arrLinks = arrMd.map(elem => getLinks(getContent(elem), elem));
  let newArr = [];
  arrLinks.forEach(element => {
    element.forEach(elem => {
      newArr.push(elem);
      /* let text=elem.text;
      let hre=elem.href;
      let fil=elem.file;
      resolve(console.log(fil," ",text," ",hre)); */
    })
  })
  resolve(newArr);
});

export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  setTimeout(() => {
    let newPath = path;
    if (isValidPath(path)) {
      if (!isAbsolutePath(path)) newPath = convertPathToAbsolute(path);
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
              .then(resp => resolve(resp));
          })
          .catch(err => reject(err))
      }
    } else {
      console.log('La ruta ingresada no existe');
    }
  }, 1000);
});