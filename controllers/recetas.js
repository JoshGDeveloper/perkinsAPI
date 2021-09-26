//Mongoose
const mongoose = require("mongoose");
//Modelo
const Receta = mongoose.model("Receta");

//----------CRUD------------
//-----------Create
function crearReceta(req, res, next) {
  const receta = new Receta(req.body);
  receta
    .save()
    .then((receta) => {
      res.status(201).send(receta.publicData());
    })
    .catch(next);
}

//-------------Read
function obtenerReceta(req, res, next) {
  if (req.params.id) {
    Receta.findById(req.params.id)
      .then((receta) => {
        res.send(receta.publicData());
      })
      .catch(next);
  } else {
    Receta.find()
      .then((recetas) => {
        res.send(recetas);
      })
      .catch(next);
  }
}

//------------Update
function modificarReceta(req, res, next) {
  Receta.findById(req.params.id)
    .then((receta) => {
      if (!receta) {
        return res.sendStatus(401);
      }
      let nuevaInfo = req.body;
      if (typeof nuevaInfo.ingredientes !== "undefined")
        receta.ingredientes = nuevaInfo.ingredientes;
      receta
        .save()
        .then((updated) => {
          res.status(201).json(updated.publicData());
        })
        .catch(next);
    })
    .catch(next);
}

//----------Delete
function eliminarReceta(req, res, next) {
  Receta.findOneAndDelete({ _id: req.params.id }).then((r) => {
    res.status(200).send(`Receta ${req.params.id} eliminada: ${r}`);
  });
}

//-----------Limite de registros
function limitar(req, res, next) {
  const limite = parseInt(req.params.limite);
  Receta.aggregate([
    {
      $limit: limite,
    },
  ])
    .then((r) => {
      res.status(200).send(r);
    })
    .catch(next);
}

module.exports = {
  crearReceta,
  obtenerReceta,
  modificarReceta,
  eliminarReceta,
  limitar
};
