const mdLinks = require('../src/md-links');

describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
/*   it('debería retornar un link .md para "./exampleTest"', () => {
    expect(mdLinks("./exampleTest",'')).resolves.toBe("./exampleTest/README.md   https://joi.dev  Visit the joi.dev");
  });
  it('debería retornar " " links .md para "./src"', () => {
    expect(mdLinks("./src",'')).resolves.toBe(undefined);
  });  */
});


