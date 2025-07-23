const cds = require('@sap/cds');

describe('Books Service Tests', () => {
  const test = cds.test(__dirname + '/..');  
  const { POST, GET, expect } = test;         

  beforeEach(test.data.reset);                

  it('Books created ->201', async()=>{
    const newBook = {title:'kozina' , author:'saaid'};
    const { status , data  } = await POST('/odata/v4/catalog/Books',newBook);

    expect(status).to.equal(201);
    expect(data.author).to.equal(newBook.author);
  })

  it('Books get -> 200',async() =>{
    const {status , data} = await GET('/odata/v4/catalog/Books');
    expect(status).to.equal(200);
    expect(Array.isArray(data.value)).to.equal(true)
  })


});