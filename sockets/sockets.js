const {io} = require("../index");
const Bandas = require("../models/bands"); 
const Band = require("../models/band"); 
const bandas = new Bandas();
console.log("Init Server");

bandas.addBand(new Band('Cocofunca'));
bandas.addBand(new Band('Bon Jovi'));
bandas.addBand(new Band('Jon Carlos band'));

console.log(bandas.getBandas());

//mensajes de Sockets 
io.on('connection', client => {
    console.log("Cliente Conectado");
    
    client.emit('active-bands', bandas.getBandas());
    
    client.on('mensaje', (info) => {
        console.log("Desde el cliente: ", info);
        io.emit("mensaje", {"admin": 'Nuevo mensaje'});
    });

    client.on('vote-band', (payload) => {
        console.log("Se recibió un voto por: ", payload.id);
        bandas.voteBand(payload.id);
        io.emit('active-bands', bandas.getBandas());
    });
    //add-band
    client.on('add-band', (payload) => {
        console.log("Se recibió una nueva banda por: ", payload.name);
        bandas.addBand(new Band(payload.name));
        io.emit('active-bands', bandas.getBandas());
    });
    //delete-band
    client.on('delete-band', (payload) => {
        console.log("Se elimina una banda: ", payload.id);
        bandas.deleteBanda(payload.id);
        io.emit('active-bands', bandas.getBandas());
    });
    client.on('disconnect', () => { console.log("Cliente Desconectado"); });
    
});