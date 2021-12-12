import { totalLinks, uniqueLinks,validateLinks } from '../src/validate.js';

const arrayLink = [{
  href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions',
  text: 'Funciones Anónimas',
  file: 'C:\\Users\\MILAGROS\\md-links\\src\\README.md'
}];

const arrayResultLink = [{
  'file': 'C:\\Users\\MILAGROS\\md-links\\src\\README.md',
  'href': 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions',
  'status': 200,
  'statusText': 'OK',
  'text': 'Funciones Anónimas'
}];

const arrayBroken = [{
  href: 'https://developeron.mozilla.org',
  text: 'no existe',
  file: 'C:\\Users\\MILAGROS\\md-links\\src\\README.md'
}]

const arrayResultBroken = [{
  file: 'C:\\Users\\MILAGROS\\md-links\\src\\README.md',
  href: 'https://developeron.mozilla.org',
  status: 404,
  statusText: 'FAIL',
  text: 'no existe'
}];

describe('validateLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('Debería retornar el array de links con el codigo de respuesta http', (done) => {
    return validateLinks(arrayLink)
      .then((res) => {
        expect(res).toEqual(arrayResultLink);
        done()
      })
  });
  it('Debería retornar el array de links con el codigo de respuesta http y un mensaje de FAIL', (done) => {
    return validateLinks(arrayBroken)
      .then((res) => {
        expect(res).toEqual(arrayResultBroken);
        done()
      });
  });
});

const links = [
  { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.canva.com/', text: 'Visita este sitio' },
  { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.abc.com/', text: 'Visita este sitio' },
  { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.google.com/', text: ' Google' },
  { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.facebook.com/', text: ' Facebook' },
  { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.twitter.com/', text: ' twuitter' },
  { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.canva.com/', text: ' Canvas' },
  { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.canva.com/', text: ' Canvas' }
];
const linksExample = [
  { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.mipagina.com/', text: 'Visita este sitio' },
  { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.abecedario.com/', text: 'Visita este sitio' },
   { file: 'C:\\Users\\Milagros\\md-links\\src\\README.md', href: 'https://www.abecedario.com/', text: ' Canvas' }
];


describe('totalLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof totalLinks).toBe('function');
  });
  it('Debería retornar un string con el total de links', () => {
    expect(totalLinks(links)).toEqual('TOTAL: 7');
  });
  it('Debería retornar un string con el total de links', () => {
    expect(totalLinks(linksExample)).toEqual('TOTAL: 3');
  });
});

describe('uniqueLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof uniqueLinks).toBe('function');
  });
  it('Debería retornar un string con el total de links únicos', () => {
    expect(uniqueLinks(links)).toEqual('UNIQUE: 5');
  });
  it('Debería retornar un string con el total de links únicos', () => {
    expect(uniqueLinks(linksExample)).toEqual('UNIQUE: 2');
  });
});