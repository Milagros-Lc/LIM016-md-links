const funciones = require('../src/funciones');

const dato1 = 'https://joi.dev/resources/status/#joi';
const dato2 = 'Este es el link';
const dato3 = 'prueba/README.md';

const link = {
  "href": 'https://joi.dev/resources/status/#joi',
  "text": 'Este es el link',
  "file": './prueba/README.md',
  "status": '200',
  "sms": 'ok'
}

const data5 = ['C:\\Users\\MARLON\\Desktop\\MD-Links\\LIM016-md-links\\prueba\\example',
  'C:\\Users\\MARLON\\Desktop\\MD-Links\\LIM016-md-links\\prueba\\README.md',
  'C:\\Users\\MARLON\\Desktop\\MD-Links\\LIM016-md-links\\prueba\\example\\READM0.md']

const data6 = ['https://joi.dev',
  'https://joi.dev/api/',
  'https://joi.dev/resources/status/#joi',
  'https://joi.dev/resources/changelog/',
  ' https://joi.dev/policies/',
  'https://joi.dev/resources/status/#joi',
  'https://joi.dev/resources/changelog/',
  ' https://joi.dev/policies/']

 const dataPrueba = ['https://jestjs.io',
   'https://jestjs.io/es-ES/docs/expect',
   'https://jestjs.io',
   'https://jestjs.io/es-ES/docs/expect',
  ]

const data7 = "C:\\Users\\MARLON\\Desktop\\md_links\\LIM016-md-links\\prueba\\README.md";
const data8 = "prueba/README.md";

describe('validateLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof funciones.validateLinks).toBe('function');
  });
  it('Debería retornar un objeto links con el código de respuesta 200', (done) => {
    funciones.validateLinks(dato1, dato2, dato3)
      .then((res) => {
        expect(res).toEqual(link);
        done();
      })
  });
});
/* describe('recursiveFile', () => {
  it('Debería ser una función', () => {
    expect(typeof funciones.recursiveFile).toBe('function');
  });
  it('Debería retornar un arreglo de carpetar y archivos .md', () => {
    expect( funciones.recursiveFile('./prueba')).toEqual(data5);   
  });
}); */

describe('totalLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof funciones.totalLinks).toBe('function');
  });
  it('Debería retornar  8 para totalLinks', (done) => {
    funciones.totalLinks(data6)
      .then((res) => {
        expect(res).toEqual(8);
        jest.setTimeout;
        done();
      })
  });
  it('Debería retornar  4 para totalLinks', (done) => {
    funciones.totalLinks(dataPrueba)
      .then((res) => {
        expect(res).toEqual(4);
        jest.setTimeout;
        done();
      })
  });
});
describe('totalUniques', () => {
  it('Debería ser una función', () => {
    expect(typeof funciones.totalUniques).toBe('function');
  });
  it('Debería retornar 5 para el de links únicos', (done) => {
    funciones.totalUniques(data6)
      .then((res) => {
        expect(res).toEqual(5);
        jest.setTimeout;
        done();
      })
  });
  it('Debería retornar 2 para el de links únicos', (done) => {
    funciones.totalUniques(dataPrueba)
      .then((res) => {
        expect(res).toEqual(2);
        jest.setTimeout;
        done();
      })
  });
});
describe('convertPathRelativa', () => {
  it('Debería ser una función', () => {
    expect(typeof funciones.convertPathRelativa).toBe('function');
  });
  it('Debería convetir "C:\Users\MARLON\Desktop\MD-Links\LIM016-md-links\prueba\README.md" a "\prueba\README.md"', () => {
    expect(funciones.convertPathRelativa(data7)).toEqual(data8);
  });
});