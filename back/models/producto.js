const mongoose = require('mongoose')

const tiendaSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: true, 
        trim: true 
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true, 
        min: [0, 'El precio debe ser un número positivo'] 
    },
    cantidadStock: {
        type: Number,
        required: true,
        min: [0, 'La cantidad en stock no puede ser negativa']
    },
    descripcion: {
        type: String,
        trim: true
    },
    imagen: {
        type: String,
        trim: true
    }
}, {
    timestamps: true 
});

const ModelTienda = mongoose.model('productos', tiendaSchema); 

module.exports = ModelTienda;