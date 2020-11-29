const express = require("express");
const path = require("path");
require("dotenv").config();

//App de Express
const app = express();
/*
    Ejecutar aplicación con NPM y NODEMON: 
    Desarrollo: npm run start:dev
    Producción: node start
*/
//Servidor Sockets
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/sockets");
const publicPath = path.resolve(__dirname, 'public');

//respuesta GET
app.use(express.static(publicPath));

server.listen(process.env.PORT, (error) =>
{
    if(error) throw new Error(error);

    console.log("Servidor Corriendo en puerto", process.env.PORT);
});