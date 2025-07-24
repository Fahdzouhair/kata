const cds = require('@sap/cds');

describe('Books Service Tests', () => {
  const test = cds.test(__dirname + '/..');
  const { POST, GET, PUT, DELETE, expect } = test;
  const newBook = { title: 'kozina', author: 'saaid' };

  beforeEach(test.data.reset);

  // check authenticated user get a 401 status with POST
  it('Books Post with Alice', async () => {

    const { status, data } = await POST('/odata/v4/catalog/Books', newBook, { auth: { username: "fahd", password: "123456" } });
    expect(status).to.equal(201);
    expect(data.author).to.equal(newBook.author);
  })

  // check unauthenticated user get a 401 status with POST
  it('Books POST with unauthenticated user -> 401', async () => {

    try {
      await POST('/odata/v4/catalog/Books', newBook);
    } catch (err) {
      expect(err.status).to.equal(401);
    }
  })

  // check unauthenticated user get a 401 status with GET
  it('Books Get with unauthenticated user -> 401', async () => {
    try{
      const { status } = await GET('/odata/v4/catalog/Books');
    }catch(err){
      expect(err.status).to.eql(401);
    }
  })


  // check unauthenticated user get a 401 status with GET
  it('Books Get With  unauthenticated user -> 401', async () => {
    try {
      await GET('/odata/v4/catalog/Books');
    } catch (err) {
      expect(err.status).to.eql(401);
    }
  })

  // check PUT Books is rejected with 405
  it('Book PUT Test ->405', async () => {
    try {
      await PUT('/odata/v4/catalog/Books(6b4e801c-c081-440d-8353-457767a327a4)', { title: "ana", author: '8' }, { auth: { username: "fahd", password: "123456" } });
      expect.fail('It should fail here on PUT');
    } catch (error) {
      expect(error?.status).to.eql(405, error.message);
    }
  })


  // check Delete Books is rejected with 405
  it('Book DELETE Test ->405', async () => {
    try {
      await DELETE('/odata/v4/catalog/Books(7812e4c4-9db5-4176-bb64-1b216bb2f742)', { auth: { username: "fahd", password: "123456" } });
      expect.fail('It should fail here on DELETE');
    } catch (error) {
      expect(error?.status).to.eql(405, error.message);
    }
  })
});