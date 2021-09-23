//Importación de la biblioteca mongoose
const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

//Definicion del esquema
const RecetaSchema = new mongoose.Schema({
    ingredientes: {
        type: [String],
        required: true
    }
}, {timestamps: true, collection: 'recetas'});

//Datos publicos del cliente
RecetaSchema.methods.publicData = function (){
    return{
        id: this.id,
        ingredientes: this.ingredientes
    };
};

mongoose.model("Receta", RecetaSchema);