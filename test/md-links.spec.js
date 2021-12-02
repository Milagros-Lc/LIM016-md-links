const mdLinks = require('../md-links.js');


describe('mdLinks', () => {

  it('Si le envio la ruta "prueba" deberia listar 5 links', () => {
    const result = mdLinks('./prueba');
    console.log(result)
  });

});
