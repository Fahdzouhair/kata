const cds = require('@sap/cds');

module.exports = srv => {
    srv.on('buyBook', async (req) => {
        const { bookID } = req.data;
        console.dir(bookID);
        const BookToInsert = {
            book_id: bookID,
            user_id: req.user.id,
            date: new Date().toISOString().slice(0, 10)
        }
        const existBook = await cds.run(SELECT.one.from('Book').where({ ID: bookID }));

        if (!existBook) {
            return req.reject({
                status: 404,
                code: "BOOK_NOT_EXIST",
                message: `The Book ${params[0].ID} does not exist !`,
                target: 'bookID'
            })
        }

        try {
            const [{ ID }] = await cds.run(
                INSERT.into('PurchaseHistory')
                    .entries(BookToInsert)
            );
            req.res.status(201);
            return { ID, ...BookToInsert }
        } catch (err) {
            throw req.reject({
                status: err.status,
                code: err.code,
                message: err.message
            })
        }

    }),
        srv.on('buyBook2', async (req) => {
            const { params } = req;
            const bookInserted = {
                book_id: params[0].ID,
                user_id: req.user.id,
                date: new Date().toISOString().slice(0, 10)
            }
            const existBook = await cds.run(SELECT.one.from('Book').where({ ID: params[0].ID }));

            if (!existBook) {
                return req.reject({
                    status: 404,
                    code: "BOOK_NOT_EXIST",
                    message: `The Book ${params[0].ID} does not exist !`,
                    target: 'bookID'
                })
            }
            try {
                const [{ ID }] = await cds.run(INSERT.into('PurchaseHistory').entries(bookInserted));
                req.res.status(201);
                return { ID };
            } catch (err) {
                throw req.reject({
                    status: err.status,
                    code: err.code,
                    message: err.message
                })
            }

        });
};
