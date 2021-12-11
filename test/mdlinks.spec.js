const mdLinks = require('../src/md-links');
const rutaConvert= "./prueba";
const option1="--stats"
const option2=""

describe('mdLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debería retornar 2 valores', (done) => {
    mdLinks(rutaConvert, option1, option2)
      .then((res) => {
        expect(res).toEqual("Total: 9 Unique:6");
        done();
      })
  });
});