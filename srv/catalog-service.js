const cds = require('@sap/cds');

module.exports = srv => {
    srv.on('buyBook', async (req) => {
        const { params } = req;

        const bookInserted = {
            book_id: params[0].ID,
            user_id: req.user.id,
            date: Date.now()
        }
        
        
        const [ { ID : existBook } ] = await cds.run(req.query);

        if (!existBook) {
            return req.reject({
                status: 404,
                code: "BOOK_NOT_EXIST",
                message: `The Book ${params[0].ID} does not exist !`,
                target: 'bookID'
            })
        }
        const [{ ID }] = await cds.run(INSERT.into('PurchaseHistory').entries(bookInserted));
            req.res.status(201);
            return { ID , ...bookInserted };

    });
};
