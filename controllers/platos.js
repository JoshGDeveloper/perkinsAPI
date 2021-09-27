//Mongoose
const mongoose = require("mongoose");
//Modelo
const Plato = mongoose.model("Plato");
//Agregaciones
const platoConReceta = [
  {
    '$lookup': {
      'from': 'recetas', 
      'localField': 'idReceta', 
      'foreignField': '_id', 
      'as': 'objeto_ingredientes'
    }
  }, {
    '$addFields': {
      'ingredientes_objeto': {
        '$arrayElemAt': [
          '$objeto_ingredientes', 0
        ]
      }
    }
  }, {
    '$addFields': {
      'ingredientes': '$ingredientes_objeto.ingredientes'
    }
  }, {
    '$project': {
      'nombre': 1, 
      'precio': 1, 
      'tiempoPreparacion': 1, 
      'calorias': 1, 
      'porciones': 1, 
      'ingredientes': 1
    }
  }
];

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
    let id = mongoose.Types.ObjectId(req.params.id);
    platoConReceta.unshift({
      '$match': {
        '_id': id
      }
    });
    Plato.aggregate(platoConReceta)
      .then((plato) => {
        res.send(plato);
        platoConReceta.splice(0, 1,);
      })
      .catch(next);
  } else {
    Plato.aggregate(platoConReceta)
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

//--------Busqueda por nombre
function buscarPlato(req, res, next){
  const nombre = req.params.nombre;
  Plato.aggregate([
    {
      '$match': {
        'nombre': new RegExp(nombre)
      }
    }
  ]).then( r => {
    res.status(200).send(r)
  }).catch(next)
}

//-----------Limite de registros
function limitar(req, res, next) {
  const limite = parseInt(req.params.limite);
  platoConReceta.push( {
    '$limit': limite
  })
  Plato.aggregate(platoConReceta)
    .then((r) => {
      res.status(200).send(r);
      platoConReceta.pop();
    })
    .catch(next);
}

//-------Consulta por campos
function consultarCampos(req, res, next) {
  let nuevaInfo = req.body;
  const project = {};
  project._id=0;
  if (typeof nuevaInfo.id !== "undefined" && nuevaInfo.id === 1)
    project._id = nuevaInfo.id;
  if (typeof nuevaInfo.precio !== "undefined" && nuevaInfo.precio === 1)
    project.precio = nuevaInfo.precio;
  if (typeof nuevaInfo.nombre !== "undefined" && nuevaInfo.nombre === 1)
    project.nombre = nuevaInfo.nombre;
  if (typeof nuevaInfo.tiempoPreparacion !== "undefined" && nuevaInfo.tiempoPreparacion === 1)
    project.tiempoPreparacion = nuevaInfo.tiempoPreparacion;
  if (typeof nuevaInfo.calorias !== "undefined" && nuevaInfo.calorias === 1)
    project.calorias = nuevaInfo.calorias;
  if (typeof nuevaInfo.porciones !== "undefined" && nuevaInfo.porciones === 1)
    project.porciones = nuevaInfo.porciones;
  Plato.aggregate([
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
  crearPlato,
  obtenerPlato,
  modificarPlato,
  eliminarPlato,
  buscarPlato,
  limitar,
  consultarCampos
};
