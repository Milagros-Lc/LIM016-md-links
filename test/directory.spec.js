import path from 'path';
import { isFilePath, getPathsFromDirectory,  searchFilesMd } from '../src/funciones'

const cwd = process.cwd();

const getPath = route => path.join(cwd, route);

const outputPaths = [
  'test\\directory-test\\directory1\\directory2\\help.md',
  'test\\directory-test\\directory1\\directory2\\style.css',
  'test\\directory-test\\directory1\\main.js',
  'test\\directory-test\\hola.md',
  'test\\directory-test\\README.md'].map(route => getPath(route));

const outputFilesMd = [
  'test\\directory-test\\directory1\\directory2\\help.md',
  'test\\directory-test\\hola.md',
  'test\\directory-test\\README.md'
].map(route => getPath(route));

describe('isFilePath', () => {
  it('Debería ser una función', () => {
    expect(typeof isFilePath).toBe('function');
  });
  it('Debería retornar true si es ruta de un archivo', () => {
  expect(isFilePath(getPath('test\\file.spec.js'))).toBe(true);
  });
  it('Debería retornar false si es de un directorio', () => {
    expect(isFilePath(getPath('test'))).toBe(false);
  });
});

describe('getPathsFromDirectory', () => {
  it('Debería ser una función', () => {
    expect(typeof getPathsFromDirectory).toBe('function');
  });
  it('Debería recibir la ruta de un directorio y devolver un array con todas las rutas de sus archivos', () =>{
    expect(getPathsFromDirectory(getPath("test\\directory-test"))).toEqual(outputPaths);
  });
  it('Debería recibir la ruta de un archivo y devolver un array con la ruta del archivo', () => {
    expect(getPathsFromDirectory(getPath("test\\directory-test\\hola.md"))).toEqual([getPath("test\\directory-test\\hola.md")]);
  });
});

describe('searchFilesMd', () => {
  it('Debería ser una función', () => {
    expect(typeof searchFilesMd).toBe('function');
  });
  it('Debería recibir un array de rutas de archivos y obtener solo los archivos .md', () => {
    expect(searchFilesMd(outputPaths)).toEqual(outputFilesMd);
  });
});