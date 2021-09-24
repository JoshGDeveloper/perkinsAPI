//Mongoose
const mongoose = require("mongoose");
//Modelo
const Cliente = mongoose.model("Cliente");

//----------CRUD------------
//-----------Create
function crearCliente(req, res, next) {
  const cliente = new Cliente(req.body);
  cliente
    .save()
    .then((cliente) => {
      res.status(201).send(cliente.publicData());
    })
    .catch(next);
}

//-------------Read
function obtenerCliente(req, res, next) {
  if (req.params.id) {
    Cliente.findById(req.params.id)
      .then((cliente) => {
        res.send(cliente.publicData());
      })
      .catch(next);
  } else {
    Cliente.find()
      .then((clientes) => {
        res.send(clientes);
      })
      .catch(next);
  }
}

//------------Update
function modificarCliente(req, res, next) {
  Cliente.findById(req.params.id)
    .then((cliente) => {
      if (!cliente) {
        return res.sendStatus(401);
      }
      let nuevaInfo = req.body;
      if (typeof nuevaInfo.email !== "undefined")
        cliente.email = nuevaInfo.email;
      if (typeof nuevaInfo.nombre !== "undefined")
        cliente.nombre = nuevaInfo.nombre;
      if (typeof nuevaInfo.direccion !== "undefined")
        cliente.direccion = nuevaInfo.direccion;
      if (typeof nuevaInfo.telefono !== "undefined")
        cliente.telefono = nuevaInfo.telefono;
      cliente
        .save()
        .then((updated) => {
          res.status(201).json(updated.publicData());
        })
        .catch(next);
    })
    .catch(next);
}

//----------Delete
function eliminarCliente(req, res, next) {
  Cliente.findOneAndDelete({ _id: req.params.id }).then((r) => {
    res.status(200).send(`Cliente ${req.params.id} eliminado: ${r}`);
  });
}

module.exports = {
  crearCliente,
  obtenerCliente,
  modificarCliente,
  eliminarCliente,
};
