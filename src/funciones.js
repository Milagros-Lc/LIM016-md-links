import fs from 'fs';
import path from 'path';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
import showdown from 'showdown';


export const pathFile = (route) => {
	const stats = fs.lstatSync(route);
	const answerStat = stats.isFile();
	return answerStat;
};

export const lisDirectorio = route => {
  let arrPathFiles = [];
  if(pathFile(route)){
    arrPathFiles.push(route);
  } else {
    const readDirectory = fs.readdirSync(route);
    readDirectory.forEach(file => {
      const pathFile = path.join(route, file);
      arrPathFiles = arrPathFiles.concat(lisDirectorio(pathFile))
    })
  }
  return arrPathFiles;
};

export const searchFilesMd = arrPaths => 
  arrPaths.filter((file) => {
    return path.extname(file) === '.md';
  });

  //..............................................



const converter = new showdown.Converter();

export const obtenerContenido = rutaFile => fs.readFileSync(rutaFile).toString();

export const obtenerLinks= (contentFile, rutaFile) => {
  const contentHTML = converter.makeHtml(contentFile);
  const dom = new JSDOM(contentHTML);
  const arrayOfTagsA = dom.window.document.querySelectorAll('a');
  let arrNew = [];
  arrayOfTagsA.forEach(elem => {
    arrNew.push({
      href: elem.href, 
      text: (elem.textContent).slice(0,50), 
      file: rutaFile
    });
  });
  return arrNew;
};
//-----------------------------------------------------


const cwd = process.cwd();

export const pathValidate = route => fs.existsSync(route);

export const pathAbsoluta = route => path.isAbsolute(route);

export const convertPathToAbsolute = route => path.join(cwd, route);



