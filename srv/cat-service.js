module.exports = (srv) => {

    srv.on('DELETE','Book',() => {
        throw new Error('Methode not Allowed');
    });
    
    srv.on('UPDATE','Book',() => {
        throw new Error('Methode not Allowed');
    })

}