const cds = require('@sap/cds');


const test = cds.test(__dirname + '/..');
const { POST, GET, PUT, DELETE, expect, axios } = test;
const service = '/odata/v4/catalog/';
const url = (entity, id) => {
  return id ? `${service}${entity}('${id}')` : `${service}/${entity}`;
}


//executeRequestExpectingErrorStatus expects the fn to throw an error with a specific status otherwise the test will fail.
const executeRequestExpectingErrorStatus = async (fn, err_stratus, message) => {
  try {
    await fn();
    expect.fail(`it should failed ${message} `)
  } catch (err) {
    expect(err.status).to.eql(err_stratus, err.message);
  }
}

describe('Books Service Tests', () => {
  axios.defaults.auth = { username: "fahd", password: "123456" };

  let bookTestId;
  const newBook = {
    title: 'kozina',
    author: 'saaid'
  };

  //check buyer can't post Book
  it('Books Post with saif (Buyer)', async () => {
    await executeRequestExpectingErrorStatus(
      () => POST(url('Books'), newBook, { auth: { username: "saif", password: "1234567" } }),
      403,
      'On Post with user saif (Buyer)'
    )

  })
  // check authenticated user get a 401 status with POST
  it('Books Post with Fahd (Seller)', async () => {

    const { status, data } = await POST(url('Books'), newBook);
    expect(status).to.equal(201);
    expect(data.author).to.equal(newBook.author);
    bookTestId = data.ID;
  })

  it('Test GET After Post (Seller)', async () => {
    const { data } = await GET(url('Books', bookTestId));
    expect(data.title).to.eql(newBook.title);
    expect(data.author).to.eql(newBook.author);
    expect(data.ID).to.eq(bookTestId);
  })

  it('Test Count item in GET BOOKS with (Buyer)', async () => {
    const { data } = await GET(url('Books'),{auth : {username : "saif" , password: "1234567"}});
    expect(data.value.length).to.eql(4);
  })

  // check unauthenticated user get a 401 status with POST
  it('Books POST with unauthenticated user -> 401', async () => {

    await executeRequestExpectingErrorStatus(
      () => POST(url('Books'), newBook, { auth: null }),
      401,
      'on POST Book'
    )

  })


  // check unauthenticated user get a 401 status with GET
  it('Books Get With  unauthenticated user -> 401', async () => {

    await executeRequestExpectingErrorStatus(
      () => GET(url('Books'), { auth: null }),
      401, 'on GET Book'
    );

  })

  // check PUT Books is rejected with 405
  it('Book PUT Test ->405', async () => {

    await executeRequestExpectingErrorStatus(
      () => PUT(url('Books', bookTestId), { title: "ana", author: '8' }),
      405,
      'on PUT Book'
    )
  })

  // check Delete Books is rejected with 405
  it('Book DELETE Test ->405', async () => {

    await executeRequestExpectingErrorStatus(
      () => DELETE(url('Books', bookTestId)),
      405,
      'on DELETE Book'
    )
  })
})

describe('PurchaseHistories Service Test', () => {
  let purchaseHistorTestId;
  const expectedPurchaseHistory = {
    book_id: "7812e4c4-9db5-5687-bb64-1b216bb2f569",
    user_id: "7812e4c4-874d-2365-opl9-09876bb2f790",
    date: "2022-12-31"
  };

  //test GET PurchaseHistory
  it('Test GET PurchaseHistory', async () => {
    const { status, data } = await GET(url('PurchaseHistories'), { auth: null })
    expect(status).to.eql(200);
    purchaseHistorTestId = data.value[0].ID;

    const book_id = data.value[0].book_id;
    const user_id = data.value[0].user_id;
    const date = data.value[0].date;

    expect(data.value[0].book_id).to.eql(book_id);
    expect(data.value[0].user_id).to.eql(user_id);
    expect(data.value[0].date).to.eq(date);
  })

  //test Put PurchaseHistory
  it('Test PUT PurchaseHistory -> x', async () => {

    await executeRequestExpectingErrorStatus(
      () => PUT(url('PurchaseHistories', purchaseHistorTestId), { auth: null }),
      405,
      'on Put PurchaseHistory'
    )

  })

  //test Delete PurchaseHitory
  it('Test DELETE PurchaseHistory -> x', async () => {

    await executeRequestExpectingErrorStatus(
      () => DELETE(url('PurchaseHistories', purchaseHistorTestId), { auth: null }),
      405,
      'on Delete PurchaseHistory'
    )

  })


  //test Post PurchaseHistory
  it('Test POST PurchaseHistory -> x', async () => {

    await executeRequestExpectingErrorStatus(
      () => POST(url('PurchaseHistories'), { expectedPurchaseHistory }, { auth: null }),
      405,
      'on Put PurchaseHistory'
    )
  })

})

describe('Test Action buyBook', () => {
  const expectedBookToInsert = {
      bookID: "7812e4c4-9db5-4176-bb64-1b216bb2f742",
    }

  it('Test buyBook Action with Seller User', async () => {
    await executeRequestExpectingErrorStatus(
      () => POST(url('Books', expectedBookToInsert.bookID) + '/buyBook' ),
      403,
      'On buyBook Action with Seller User'
    )
  }),
 
  it(`Test buyBook Action with Buyer User`, async () => {

    axios.defaults.auth = {username : "saif" , password : "1234567"}
    const { status, data } = await POST(url('Books', expectedBookToInsert.bookID) + '/buyBook');
    
    expect(status).to.eql(201);
    expect(data.book_id).to.eql(expectedBookToInsert.bookID);
    expect(data.user_id).to.eql(axios.defaults.auth.username);

  })

  it('Test buyBook with inexisting book', async () => {
    await executeRequestExpectingErrorStatus(
      () => POST(url('Books', 'test-test-test') + '/buyBook'),
      404,
      'On buyBook action with inexisting book'
    )
  })

})



