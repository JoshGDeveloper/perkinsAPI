//Mongoose
const mongoose = require("mongoose");
//Modelo
const Pedido = mongoose.model("Pedido");

//----------CRUD------------
//-----------Create
function crearPedido(req, res, next) {
  const pedido = new Pedido(req.body);
  pedido
    .save()
    .then((pedido) => {
      res.status(201).send(pedido.publicData());
    })
    .catch(next);
}

//-------------Read
function obtenerPedido(req, res, next) {
  if (req.params.id) {
    Pedido.findById(req.params.id)
      .then((pedido) => {
        res.send(pedido.publicData());
      })
      .catch(next);
  } else {
    Pedido.find()
      .then((pedidos) => {
        res.send(pedidos);
      })
      .catch(next);
  }
}

//------------Update
function modificarPedido(req, res, next) {
  Pedido.findById(req.params.id)
    .then((pedido) => {
      if (!pedido) {
        return res.sendStatus(401);
      }
      let nuevaInfo = req.body;
      if (typeof nuevaInfo.fecha !== "undefined")
        pedido.fecha = nuevaInfo.fecha;
      if (typeof nuevaInfo.platos !== "undefined")
        pedido.platos = nuevaInfo.platos;
      if (typeof nuevaInfo.estado !== "undefined")
        pedido.estado = nuevaInfo.estado;
      pedido
        .save()
        .then((updated) => {
          res.status(201).json(updated.publicData());
        })
        .catch(next);
    })
    .catch(next);
}

//----------Delete
function eliminarPedido(req, res, next) {
  Pedido.findOneAndDelete({ _id: req.params.id }).then((r) => {
    res.status(200).send(`Pedido ${req.params.id} eliminado: ${r}`);
  });
}

module.exports = {
  crearPedido,
  obtenerPedido,
  modificarPedido,
  eliminarPedido,
};
