//Importación de la biblioteca mongoose
const mongoose = require('mongoose');

//Definicion del esquema
const PedidoSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    platos:{
        type: [ { 
            plato: {type: String, required: true}, 
            cantidad: {type: mongoose.Schema.Types.Decimal128, required: true},
            precio:  {type: mongoose.Schema.Types.Decimal128, required: true},
            subtotal: {type: mongoose.Schema.Types.Decimal128, required: true}
          }
        ],
        required: true
    },
    importe: {
        type: mongoose.Schema.Types.Decimal128
    },
    estado: {
        type: String,
        enum: ['abierto', 'preparando', 'entregado'],
        required: true
    },
    cliente:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cliente', 
        required: true
    }
}, {timestamps: true, collection: 'pedidos'});

//Datos publicos del pedido
PedidoSchema.methods.publicData = function(){
    return{
        id: this.id,
        fecha: this.fecha,
        cliente: this.cliente,
        platos: this.platos,
        importe: this. importe,
        estado: this.estado
    };
};

mongoose.model("Pedido", PedidoSchema);
