//Importación de la biblioteca mongoose
const mongoose = require('mongoose');

//Definicion del esquema
const PlatoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    tiempoPreparacion: {
        type: String,
        required: true
    },
    calorias:{
        type: String,
        required: true
    },
    porciones: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    imagen:{
        type: String,
        required: true
    },
    idReceta: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Receta',
        required: true
    }
}, {timestamps: true, collection: 'platos'});

//Datos publicos del cliente
PlatoSchema.methods.publicData = function (){
    return{
        id: this.id,
        nombre: this.nombre,
        precio: this.precio,
        tiempoPreparacion: this.tiempoPreparacion,
        calorias: this.calorias,
        porciones: this.porciones,
        imagen: this.imagen,
        idReceta: this.idReceta
    };
};

mongoose.model("Plato", PlatoSchema);