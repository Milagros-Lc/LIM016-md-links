import path from 'path';
import { convertPathToAbsolute, isAbsolutePath, isValidPath } from '../src/funciones';

const cwd = process.cwd();

describe('isValidPath', () => {
  it('Debería ser una función', () => {
    expect(typeof isValidPath).toBe('function');
  });
  it('Debería retornar true si es la ruta es válida', () => {
    expect(isValidPath(path.join(cwd, '\\src'))).toBe(true);
  });
  it('Debería retornar false si es la ruta no es válida', () => {
    expect(isValidPath('C:\\Users\\C:\\projects')).toBe(false);
  });
});

describe('isAbsolutePath', () => {
  it('Debería ser una función', () => {
    expect(typeof isAbsolutePath).toBe('function');
  });
  it('Debería retornar true si la ruta es absoluta', () => {
    expect(isAbsolutePath(path.join(cwd, 'README.md'))).toBe(true);
  });
  it('Debería retornar false si la ruta es relativa', () => {
    expect(isAbsolutePath('..\\src\\README.md')).toBe(false);
  });
});

/* describe('convertPathToAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof convertPathToAbsolute).toBe('function');
  });
  it('Debería recibir una ruta relativa y retornar la ruta absoluta', () => {
  expect(convertPathToAbsolute('..\\md-links\\src\\README.md')).toBe(path.join(cwd, 'src\\README.md'));
  });
}); */