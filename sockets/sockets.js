const {io} = require("../index");

//mensajes de Sockets 
io.on('connection', client => {
    console.log("Cliente Conectado");
    client.on('mensaje', (info) => {
        console.log("Desde el cliente: ", info);
        io.emit("mensaje", {"admin": 'Nuevo mensaje'});
    });
    client.on('disconnect', () => { console.log("Cliente Desconectado"); });
    
});