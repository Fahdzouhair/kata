const cds = require('@sap/cds');

describe('Books Service Tests', () => {
  const test = cds.test(__dirname + '/..');  
  const { POST, GET, PUT, DELETE, expect } = test;
  const newBook = {title:'kozina' , author:'saaid'};         

  beforeEach(test.data.reset);                
  
  // check authenticated user get a 401 status with POST
  it('Books Post with Alice', async()=>{
    const newBook = {title:'kozina' , author:'saaid'};
    const { status , data  } = await POST('/odata/v4/catalog/Books',newBook , { auth : { username : "fahd" , password : "123456" }});

    expect(status).to.equal(201);
    expect(data.author).to.equal(newBook.author);
  })

  // check unauthenticated user get a 401 status with POST
  it('Books POST with unauthenticated user -> 401', async()=>{
    
    try{
        const { status , data  } = await POST('/odata/v4/catalog/Books',newBook);
   
    }catch(err){
         expect(err.response.status).to.equal(401);
    }
  })

  // check authenticated user get a 401 status with GET
  it('Books Get With Alice User', async()=>{
    const {status, data} = await GET('/odata/v4/catalog/Books', { auth: { username : 'fahd' , password : '123456' }});
    expect(status).to.eql(200);
  })


  // check unauthenticated user get a 401 status with GET
  it('Books Get With  unauthenticated user -> 401', async()=>{
    try{
      const {status, data} = await GET('/odata/v4/catalog/Books');

    }catch(err){
      expect(err.response.status).to.eql(401);
    }
  })  

  // check PUT Books is rejected with 405
  it('Book PUT Test ->405',async()=>{
    try{
      const { status } = await PUT('/odata/v4/catalog/Books',newBook, { auth : {username : "fahd" , password : "123456"}});

    }catch(err){
      console.log(err);
      expect(err.response.status).to.eql(405);
    }
  })

  it('Book DELETE Test ->405',async()=>{
    try{
      const { status } = await DELETE('/odata/v4/catalog/Books', { auth : {username : "fahd" , password : "123456"}});

    }catch(err){
      console.log(err);
      expect(err.response.status).to.eql(405);
    }
  })
  

});