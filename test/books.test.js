const cds = require('@sap/cds');


const test = cds.test(__dirname + '/..');
const { POST, GET, PUT, DELETE, expect, axios } = test;
const newBook = {
  title: 'kozina',
  author: 'saaid'
};
const newPurchaseHistory = {
  book_id: "7812e4c4-9db5-5687-bb64-1b216bb2f569",
  user_id: "7812e4c4-874d-2365-opl9-09876bb2f790",
  date: "2022-12-31"
};


let url = (entity, id) => {
  return id ? `/odata/v4/catalog/${entity}('${id}')` : `/odata/v4/catalog/${entity}`;
}
let bookTestId;
let purchaseHistorTestId;


axios.defaults.auth = { username: "fahd", password: "123456" };

const tryCatchBloc = async (fn, err_stratus, message) => {
  try {
    await fn();
    expect.fail(`it should failed ${message} `)
  } catch (err) {
    console.log('*******************')
    console.log(err);
    expect(err.status).to.eql(err_stratus, err.message);
  }
}

describe('Books Service Tests', () => {



  //it('test for Put',)

  // check authenticated user get a 401 status with POST
  it('Books Post with Fahd', async () => {
    const { status, data } = await POST(url('Books'), newBook);
    expect(status).to.equal(201);
    expect(data.author).to.equal(newBook.author);
    bookTestId = data.ID;
  })

  it('Test GET After Post', async () => {
    const { data } = await GET(url('Books', bookTestId));
    expect(data.title).to.eql(newBook.title);
    expect(data.author).to.eql(newBook.author);
    expect(data.ID).to.eq(bookTestId);
  })

  it('Test Count item in GET BOOKS', async () => {
    const { data } = await GET(url('Books'));
    expect(data.value.length).to.eql(4);
  })

  // check unauthenticated user get a 401 status with POST
  it('Books POST with unauthenticated user -> 401', async () => {

    await tryCatchBloc(
      () => POST(url('Books'), newBook, { auth: null }),
      401,
      'on POST Book'
    )

  })


  // check unauthenticated user get a 401 status with GET
  it('Books Get With  unauthenticated user -> 401', async () => {

    await tryCatchBloc(
      () => GET(url('Books'), { auth: null }),
      401,'on GET Book'
    );

  })

  // check PUT Books is rejected with 405
  it('Book PUT Test ->405', async () => {

    await tryCatchBloc(
      () => PUT(url('Books', bookTestId), { title: "ana", author: '8' }),
      405,
      'on PUT Book'
    )
  })

  // check Delete Books is rejected with 405
  it('Book DELETE Test ->405', async () => {

    await tryCatchBloc(
      () => DELETE(url('Books', bookTestId)),
      405,
      'on DELETE Book'
    )
  })
})

describe('PurchaseHistories Service Test', () => {
  //test GET PurchaseHistory
  it('Test GET PurchaseHistory', async () => {
    const { status, data } = await GET(url('PurchaseHistories'), { auth: null })
    expect(status).to.eql(200);

    const book_id = data.value[0].book_id;
    const user_id = data.value[0].user_id;
    purchaseHistorTestId = data.value[0].ID;

    expect(data.value[0].book_id).to.eql(book_id);
    expect(data.value[0].user_id).to.eql(user_id);
  })

  //test Put PurchaseHistory
  it('Test PUT PurchaseHistory -> x', async () => {

    await tryCatchBloc(
      () => PUT(url('PurchaseHistories', purchaseHistorTestId), { auth: null }),
      405,
      'on Put PurchaseHistory'
    )

  })

  //test Delete PurchaseHitory
  it('Test DELETE PurchaseHistory -> x', async () => {
    
    await tryCatchBloc(
      () => DELETE(url('PurchaseHistories', purchaseHistorTestId), { auth: null }),
      405,
      'on Delete PurchaseHistory'
    )

  })


  //test Post PurchaseHistory
  it('Test POST PurchaseHistory -> x', async () => {
    
    await tryCatchBloc(
    () => POST(url('PurchaseHistories'), newPurchaseHistory, { auth: null }),
    403,
    'on Put PurchaseHistory'
    )
  })

})



