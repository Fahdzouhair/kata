const cds = require('@sap/cds');

describe('Books Service Tests', () => {
  const test = cds.test(__dirname + '/..');  
  const { POST, GET, expect } = test;         

  beforeEach(test.data.reset);                
  
  // check authenticated user get a 401 status with POST
  it('Books Post with Alice', async()=>{
    const newBook = {title:'kozina' , author:'saaid'};
    const { status , data  } = await POST('/odata/v4/catalog/Books',newBook , { auth : { username : "alice" , password : "123456" }});

    expect(status).to.equal(201);
    expect(data.author).to.equal(newBook.author);
  })

  // check unauthenticated user get a 401 status with POST
  it('Books POST with unauthenticated user -> 401', async()=>{
    
    const newBook = {title:'kozina' , author:'saaid'};
    try{
        const { status , data  } = await POST('/odata/v4/catalog/Books',newBook);
   
    }catch(err){
         expect(err.response.status).to.equal(401);
    }
  })

  // check authenticated user get a 401 status with GET
  it('Books Get With Alice User', async()=>{
    const {status, data} = await GET('/odata/v4/catalog/Books', { auth: { username : 'alice' , password : '123456' }});
    expect(status).to.eql(200);
  })


  // check unauthenticated user get a 401 status with GET
  it('Books Get With  unauthenticated user -> 401', async()=>{
    let failed = true;
    try{
      //const {status, data} = await GET('/odata/v4/catalog/Books');
      failed = true
    }catch(err){
      expect(err.response.status).to.eql(401);
    }
    if (failed){
      expect.fail('should have fail the GET method')
    }
    expect(status).to.eql(401);
  })  
  

});