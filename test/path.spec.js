import path from 'path';
import { convertPathToAbsolute, pathAbsoluta, isValidPath } from '../src/funciones';

const cwd = process.cwd();

describe('isValidPath', () => {
  it('Debería ser una función', () => {
    expect(typeof isValidPath).toBe('function');
  });
  it('Debería retornar true si es la ruta es válida', () => {
    expect(isValidPath(path.join(cwd, '\\src'))).toBe(true);
  });
  it('Debería retornar false si es la ruta no es válida', () => {
    expect(isValidPath('C:\\Users\\C:\\noexiste')).toBe(false);
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