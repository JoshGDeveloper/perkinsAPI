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
    // Cliente.find()
    //   .then((clientes) => {
    //     res.send(clientes);
    //   })
    //   .catch(next);
    Cliente.aggregate([
      {
        '$project': {
          '_id': 1, 
          'email': 1, 
          'nombre': 1, 
          'direccion': 1, 
          'telefono': 1
        }
      }
    ])
    .then((r) => {
      res.status(200).send(r);
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

//-----------Limite de registros
function limitar(req, res, next) {
  const limite = parseInt(req.params.limite);
  Cliente.aggregate([
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
function consultaCampos(req, res, next) {
  let nuevaInfo = req.body;
  const project = {};
  project._id=0;
  if (typeof nuevaInfo.id !== "undefined" && nuevaInfo.id === 1)
    project._id = nuevaInfo.id;
  if (typeof nuevaInfo.email !== "undefined" && nuevaInfo.email === 1)
    project.email = nuevaInfo.email;
  if (typeof nuevaInfo.nombre !== "undefined" && nuevaInfo.nombre === 1)
    project.nombre = nuevaInfo.nombre;
  if (typeof nuevaInfo.direccion !== "undefined" && nuevaInfo.direccion === 1)
    project.direccion = nuevaInfo.direccion;
  if (typeof nuevaInfo.telefono !== "undefined" && nuevaInfo.telefono === 1)
    project.telefono = nuevaInfo.telefono;

  Cliente.aggregate([
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
  crearCliente,
  obtenerCliente,
  modificarCliente,
  eliminarCliente,
  limitar,
  consultaCampos,
};
