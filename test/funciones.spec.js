const funciones = require('../src/__mocks__/funciones');
let fake=[];
jest.mock('../src/funciones');


describe('GIVEN: a BankClient class', () => {
  beforeAll(() => {
     fake =   [ "//joi.dev/api/","//joi.dev/resources/status/#joi" ,"//joi.dev/resources/changelog/","//joi.dev/resources/changelog/","joi.dev/policies/"];
    ;
    funciones.totalLinks(Promise.resolve(fake));


  });
  test('WHEN: save a deposit THEN it posts the transaction', async () => {
  
    const actual = await  funciones.totalLinks(fake);
    console.log({ actual });
    
   
    
  });

});


 /*  test('WHEN: i ask for all transactions THEN it returns an empty array', async () => {
    const actual = await  funciones.totalLinks();
    const expected = [];
    expect(actual).toEqual(expected);

  }); */


