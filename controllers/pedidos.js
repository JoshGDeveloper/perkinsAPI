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

//-----------Limite de registros
function limitar(req, res, next) {
  const limite = parseInt(req.params.limite);
  Pedido.aggregate([
    {
      $limit: limite,
    },
  ])
    .then((r) => {
      res.status(200).send(r);
    })
    .catch(next);
}

//-------Consulta por campos
function consultarCampos(req, res, next) {
  let nuevaInfo = req.body;
  const project = {};
  project._id = 0;
  project.createdAt = 0;
  project.updatedAt = 0;
  if (typeof nuevaInfo.id !== "undefined" && nuevaInfo.id === 1)
    project._id = nuevaInfo.id;
  if (typeof nuevaInfo.fecha !== "undefined" && nuevaInfo.fecha === 1)
    project.fecha = nuevaInfo.fecha;
  if (typeof nuevaInfo.cliente !== "undefined" && nuevaInfo.cliente === 1)
    project.cliente = nuevaInfo.cliente;
  if (typeof nuevaInfo.platos !== "undefined" && nuevaInfo.platos === 1)
    project.platos = nuevaInfo.platos;
  if (typeof nuevaInfo.importe !== "undefined" && nuevaInfo.importe === 1)
    project.importe = nuevaInfo.importe;
  if (typeof nuevaInfo.estado !== "undefined" && nuevaInfo.estado === 1)
    project.estado = nuevaInfo.estado;

  Pedido.aggregate([
    {
      $project: project,
    },
  ])
    .then((r) => {
      res.status(200).send(r);
    })
    .catch(next);
}

module.exports = {
  crearPedido,
  obtenerPedido,
  modificarPedido,
  eliminarPedido,
  limitar,
  consultarCampos
};
