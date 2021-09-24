//Mongoose
const mongoose = require("mongoose");
//Modelo
const Plato = mongoose.model("Plato");

//----------CRUD------------
//-----------Create
function crearPlato(req, res, next) {
  const plato = new Plato(req.body);
  plato
    .save()
    .then((plato) => {
      res.status(201).send(plato.publicData());
    })
    .catch(next);
}

//-------------Read
function obtenerPlato(req, res, next) {
  if (req.params.id) {
    Plato.findById(req.params.id)
      .then((plato) => {
        res.send(plato.publicData());
      })
      .catch(next);
  } else {
    Plato.find()
      .then((platos) => {
        res.send(platos);
      })
      .catch(next);
  }
}

//------------Update
function modificarPlato(req, res, next) {
  Plato.findById(req.params.id)
    .then((plato) => {
      if (!plato) {
        return res.sendStatus(401);
      }
      let nuevaInfo = req.body;
      if (typeof nuevaInfo.nombre !== "undefined")
        plato.nombre = nuevaInfo.nombre;
      if (typeof nuevaInfo.precio !== "undefined")
        plato.precio = nuevaInfo.precio;
      if (typeof nuevaInfo.tiempoPreparacion !== "undefined")
        plato.tiempoPreparacion = nuevaInfo.tiempoPreparacion;
      if (typeof nuevaInfo.calorias !== "undefined")
        plato.calorias = nuevaInfo.calorias;
      if (typeof nuevaInfo.porciones !== "undefined")
        plato.porciones = nuevaInfo.porciones;
      if (typeof nuevaInfo.idReceta !== "undefined")
        plato.idReceta = nuevaInfo.idReceta;
      plato
        .save()
        .then((updated) => {
          res.status(201).json(updated.publicData());
        })
        .catch(next);
    })
    .catch(next);
}

//----------Delete
function eliminarPlato(req, res, next) {
  Plato.findOneAndDelete({ _id: req.params.id }).then((r) => {
    res.status(200).send(`Plato ${req.params.id} eliminado: ${r}`);
  });
}

module.exports = {
  crearPlato,
  obtenerPlato,
  modificarPlato,
  eliminarPlato,
};
