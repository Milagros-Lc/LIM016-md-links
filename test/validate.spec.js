import { validateLinks } from '../src/validate.js';
import { getTotalLinks, getUniqueLinks } from '../src/validate.js';

const arrInput = [{
  href: 'https://www.npmjs.com/package/whatwg-fetch#installation', 
  text: 'Este es el link', 
  file: 'C:\\Users\\Lab\\projects\\src\\README.md'
}];

const arrInputLinkBroken = [{
  href: 'https://www.npunonomjs.com/package/whatwg-fetch#installation', 
  text: 'Este es el link roto', 
  file: 'C:\\Users\\Lab\\projects\\src\\README.md'
}]

const arrOutput = [{
  "file": 'C:\\Users\\Lab\\projects\\src\\README.md', 
  "href": 'https://www.npmjs.com/package/whatwg-fetch#installation',  
  "status": 200, 
  "statusText": "OK",
  "text": 'Este es el link'
}];

const arrOutputBroken = [{
  file: "C:\\Users\\Lab\\projects\\src\\README.md",
  href: "https://www.npunonomjs.com/package/whatwg-fetch#installation",
  status: "",
  statusText: "Este link no existe",
  text: "Este es el link roto"
}];
/* 
describe('validateLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('Debería retornar el array de links con el estado', (done) => {
    return validateLinks(arrInput)
    .then((res) => {
      expect(res).toEqual(arrOutput);
      done()
    })
  });
  it('Debería retornar el array de links con el status y status Text de link que no existe', (done) => {
    return validateLinks(arrInputLinkBroken)
    .then((res) => {
      expect(res).toEqual(arrOutputBroken);
      done()
    });
  });
});
 */


const arrInput2 = [
  {file: 'C:\\Users\\Lab\\projects\\src\\README.md', href: 'www.abc.com', text: 'Visita este sitio'},
  {file: 'C:\\Users\\Lab\\projects\\src\\README.md', href: 'www.abc.com', text: 'Visita este sitio'},
  {file: 'C:\\Users\\Lab\\projects\\src\\README.md', href: 'www.google.com', text: 'Entra a Google'},
  {file: 'C:\\Users\\Lab\\projects\\src\\README.md', href: 'www.facebook.com', text: 'Entra a Facebook'},
  {file: 'C:\\Users\\Lab\\projects\\src\\README.md', href: 'www.linkedin.com', text: 'Entra a LinkedIn'}
];


describe('getTotalLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getTotalLinks).toBe('function');
  });
  it('Debería retornar un string con el total de links', () => {
    expect(getTotalLinks(arrInput2)).toEqual('Total: 5');
  });
});

describe('getUniqueLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getUniqueLinks).toBe('function');
  });
  it('Debería retornar un string con el total de links únicos', () => {
    expect(getUniqueLinks(arrInput2)).toEqual('Unique: 4');
  });
});