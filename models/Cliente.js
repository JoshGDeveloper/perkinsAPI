//Importación de la biblioteca mongoose
const mongoose = require('mongoose');

//Definicion del esquema
const ClienteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    }
}, {timestamps: true, collection: 'clientes'});

//Datos publicos del cliente
ClienteSchema.methods.publicData = function (){
    return{
        id: this.id,
        email: this.email,
        nombre: this.nombre,
        direccion: this.direccion,
        telefono: this.telefono,
        creacion: this.createdAt
    };
};

mongoose.model("Cliente", ClienteSchema);