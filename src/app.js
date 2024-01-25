import express from 'express';
import routerProducts from './routes/products.js';
import routerCarts from './routes/carts.js';

import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRoutes from './routes/views.router.js'
import { Server } from 'socket.io'


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use("/api/views", viewsRoutes);

// Handlebars configuracion
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


const httpServer = app.listen(8080, () => {
    console.log("Escuchando puerto 8080");
});

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
    console.log("nuevo cliente")
})


