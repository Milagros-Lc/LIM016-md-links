const mdLinks = require('../md-links.js');


describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Si le envio la ruta "prueba" deberia listar 5 links', () => {

    expect( mdLinks('prueba','si').length).toBe(5);
   
    const result = mdLinks('./prueba');    

    console.log(result)
  });
/*   it('debería retornar true para "Mage"', () => {

    expect(isFilterRol(rate, 'Mage')[0].tags.includes('Mage')).toBe(true);

  }) */

/*   it('debería retornar 0 para "Help"', () => {
    expect(isFilterRol(rate, 'Help').length).toBe(0);
  }); */
});


