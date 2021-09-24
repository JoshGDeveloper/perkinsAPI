//Express
const express = require('express');
const app = express();
const PORT = 4001;

//Bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Moongose
const mongoose = require("mongoose");
mongoose.connect(
  "mongouri"
);
mongoose.set("debug", true);

//Modelos
require('./models/Cliente');
require('./models/Pedido');
require('./models/Plato');
require('./models/Receta');

//Configurando las rutas
app.use('/v1', require('./routes'));

//Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
