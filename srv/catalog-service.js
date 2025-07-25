const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    this.after('READ','Books',(req) => {
        // Custom logic for handling READ requests on the 'Books
        //console.log('── dump de `req` dans logRequest ──');
        //console.dir(req, { depth: null });
        //return "Logged";
    });
})