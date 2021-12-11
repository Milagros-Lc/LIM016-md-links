/* const mdLinks = require('../src/md-links');
const funciones = require('../src/funciones');



const links = ["//joi.dev/api/","//joi.dev/resources/status/#joi" ,"//joi.dev/resources/changelog/","//joi.dev/resources/changelog/","joi.dev/policies/"]
const total = 4;

describe('funciones.totalUniques',()=>{
    it('is a function', () => {
      expect(typeof funciones.totalUniques).toBe('function');
    });
    
    it('returns total and unique of the array', () => {
    });
  
  });



describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  
    it('Si le envio la ruta "prueba" deberia listar 9 links', (done) => {
  
      const result = mdLinks('./prueba');
  
      console.log(result)
     
      done();
    });
  
});

const pruebaPath = 'C:\\Users\\MARLON\\Desktop\\md_links\\LIM016-md-links\\prueba';
const arrayLinks = ["https://joiijij.dev/resources/status/#joi", "https://joipo.dev/resources/status/#joi"]


describe('convertPathRelativa', () => {
  it('is a function', () => {
    expect(typeof funciones.convertPathRelativa).toBe('function');
  });
  it('Lee el link y devuelve un string', () => {
    expect(typeof funciones.convertPathRelativa(pruebaPath)).toBe('string');
  });
  it('Lee el link y devuelve una ruta relativa', () => {
    expect(funciones.convertPathRelativa(pruebaPath)).toBe('LIM016-md-links/prueba');
  });

});
describe('totalLinks', () => {
  it('is a function', () => {
    expect(typeof funciones.totalLinks).toBe('function');
  });
  it('funciona', (done) => {
    const res = funciones.totalLinks(arrayLinks);
    res.then((result) => {
      expect(result.length).toBe(39);
      done();
    })

  });

}); */