import { getArrLinks, mdLinks } from '../src/md-links';

import path from 'path';

const cwd = process.cwd();

const inputPath = path.join(cwd, 'test\\example-test');

const outPutArrLinks = [
  {'file': path.join(cwd, 'test\\example-test\\directory1\\directory2\\help.md'), 'href': 'https://www.google.com/?hl=es_419', 'text': 'Google'}, 
  {'file': path.join(cwd, 'test\\example-test\\hola.md'), 'href': 'https://www.facebook.com/', 'text': 'Hola, sígueme en Facebook'},
  {'file': path.join(cwd, 'test\\example-test\\hola.md'), 'href': 'https://www.dropbox.com/esta-pagina-no-existe', 'text': 'Inicia sesión en Dropbox'},
  {'file': path.join(cwd, 'test\\example-test\\README.md'), 'href': 'https://www.bing.com/translator', 'text': 'Haz clic aquí para más información'}
];

const outPutValidate = [
  {'file': path.join(cwd, 'test\\example-test\\directory1\\directory2\\help.md'), 'href': 'https://www.google.com/?hl=es_419', 'status': 200, 'statusText': 'OK', 'text': 'Google'}, 
  {'file': path.join(cwd, 'test\\example-test\\hola.md'), 'href': 'https://www.facebook.com/', 'status': 200, 'statusText': 'OK', 'text': 'Hola, sígueme en Facebook'}, 
  {'file': path.join(cwd, 'test\\example-test\\hola.md'), 'href': 'https://www.dropbox.com/esta-pagina-no-existe', 'status': 404, 'statusText': 'FAIL', 'text': 'Inicia sesión en Dropbox'}, 
  {'file': path.join(cwd, 'test\\example-test\\README.md'), 'href': 'https://www.bing.com/translator', 'status': 200, 'statusText': 'OK', 'text': 'Haz clic aquí para más información'}
];

describe('getArrLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getArrLinks).toBe('function');
  });
  it('Debería retornar un array de objetos [{href,text,file}]', () => {
    return getArrLinks(inputPath)
    .then((res) => {
      expect(res).toEqual(outPutArrLinks);
    })
  });
});

describe('mdLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debería retornar un array de objetos [{href, text, file}]', () => {
    return mdLinks(inputPath)
      .then((res) => {
        expect(res).toEqual(outPutArrLinks);
      })
  });
  it('Debería retornar un array de objetos con status [{href, text, file, status, statusText}]', () => {
    return mdLinks(inputPath, {validate: true})
      .then((res) => {
        expect(res).toEqual(outPutValidate);
      })
  });
});