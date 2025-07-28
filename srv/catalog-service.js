const cds = require('@sap/cds');

module.exports = srv => {
  srv.on('buyBook', async (req) => {
    const { bookID } = req.data;
    const userId = req.user.id;             
    const formattedDate = new Date().toISOString().slice(0, 10);

    const BookToInsert = {
        book_id : bookID,
        user_id : userId,
        date : formattedDate
    }
    const existBook = await cds.run(SELECT.one.from('Book').where({ ID : bookID }));

    if(!existBook){
        return req.error(404,`The Book ${bookID} does not exist !`)
    }

    try {
      const [ { ID } ] = await cds.run(
        INSERT.into('PurchaseHistory')
          .entries(BookToInsert)
      );
      req.res.status(201);
      return {ID,...BookToInsert}
    } catch (err) {
      req.error(409,err.message);
    }

  });
};
