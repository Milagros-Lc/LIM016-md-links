import path from 'path';

import { pathFile, lisDirectorio, obtenerContenido, 
  obtenerLinks, searchFilesMd , convertPathToAbsolute,
  pathAbsoluta, pathValidate 

} from '../src/funciones'

const cwd = process.cwd();

const getPath = ruta  => path.join(cwd, ruta);

describe('pathValidate', () => {
  it('Debería ser una función', () => {
    expect(typeof pathValidate).toBe('function');
  });
  it('Debería retornar true si es la ruta es válida', () => {
    expect(pathValidate(path.join(cwd, '\\src'))).toBe(true);
  });
  it('Debería retornar false si es la ruta no es válida', () => {
    expect(pathValidate('C:\\Users\\C:\\noexiste')).toBe(false);
  });
});

describe('pathAbsoluta', () => {
  it('Debería ser una función', () => {
    expect(typeof pathAbsoluta).toBe('function');
  });
  it('Debería retornar true si la ruta es absoluta', () => {
    expect(pathAbsoluta(path.join(cwd, 'README.md'))).toBe(true);
  });
  it('Debería retornar false si la ruta es relativa', () => {
    expect(pathAbsoluta('..\\src\\README.md')).toBe(false);
  });
});

describe('convertPathToAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof convertPathToAbsolute).toBe('function');
  });
  it('Debería recibir una ruta relativa y retornar la ruta absoluta', () => {
  expect(convertPathToAbsolute('..\\LIM016-md-links\\src\\README.md')).toBe(path.join(cwd, 'src\\README.md'));
  });
});

const contenido = '[Haz clic aquí para más información](https://www.bing.com/translator)'
const rutaFile = path.join(cwd, 'test\\example-test\\README.md');
const rutas = [
  'test\\example-test\\directory1\\directory2\\help.md',
  'test\\example-test\\directory1\\directory2\\style.css',
  'test\\example-test\\directory1\\main.js',
  'test\\example-test\\hola.md',
  'test\\example-test\\README.md'].map(ruta => getPath(ruta));

const fileMd = [
  'test\\example-test\\directory1\\directory2\\help.md',
  'test\\example-test\\hola.md',
  'test\\example-test\\README.md'
].map(ruta => getPath(ruta));


describe('obtenerContenido', () => {
  it('Debería ser una función', () => {
    expect(typeof obtenerContenido).toBe('function');
  });
  it('Debería extraer contenido del archivo md y devolverlo como string', () => {
    expect(obtenerContenido(rutaFile)).toBe(contenido);
  });
});

const resultRutaLink = [{
  href:'https://www.bing.com/translator', 
  text:'Haz clic aquí para más información', 
  file: rutaFile
}];

describe('obtenerLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof obtenerLinks).toBe('function');
  });
  it('Debería devolver un array de objetos(href, text, file)',() => {
    expect(obtenerLinks(contenido, rutaFile)).toEqual(resultRutaLink);
  });
});

describe('searchFilesMd', () => {
  it('Debería ser una función', () => {
    expect(typeof searchFilesMd).toBe('function');
  });
  it('Debería recibir un array de rutas de archivos y obtener solo los archivos .md', () => {
    expect(searchFilesMd(rutas)).toEqual(fileMd);
  });
});

describe('pathFile', () => {
  it('Debería ser una función', () => {
    expect(typeof pathFile).toBe('function');
  });
  it('Debería retornar true si es ruta de un archivo', () => {
  expect(pathFile(getPath('test\\funciones.spec.js'))).toBe(true);
  });
  it('Debería retornar false si es de un directorio', () => {
    expect(pathFile(getPath('test'))).toBe(false);
  });
});

describe('lisDirectorio', () => {
  it('Debería ser una función', () => {
    expect(typeof lisDirectorio).toBe('function');
  });
  it('Debería recibir la ruta de un directorio y devolver un array con todas las rutas de sus archivos', () =>{
    expect(lisDirectorio(getPath('test\\example-test'))).toEqual(rutas);
  });
  it('Debería recibir la ruta de un archivo y devolver un array con la ruta del archivo', () => {
    expect(lisDirectorio(getPath('test\\example-test\\hola.md'))).toEqual([getPath('test\\example-test\\hola.md')]);
  });
});
