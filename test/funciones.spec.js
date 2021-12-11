const funciones = require('../src/__mocks__/funciones');
const arrInput = {
  href: 'https://joi.dev/resources/status/#joi', 
  text: 'Este es el link', 
  file: './prueba/README.md'
};

const arrOutput = {
  "file": './prueba/README.md', 
  "href": 'https://joi.dev/resources/status/#joi',  
  "status": '200', 
  "statusText": "ok",
  "text": 'Este es el link'
};

describe('validateLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof funciones.validateLinks).toBe('function');
  });
  it('Debería retornar un objeto links con el estado', (done) => {
    return funciones.validateLinks(arrInput)
    .then((res) => {
      expect(res).toEqual(arrOutput);
      done()
    })
  });
});