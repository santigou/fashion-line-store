const express = require('express');
const router = express.Router();
const ModelTienda = require('../models/producto');

// Ruta GET para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await ModelTienda.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los productos.' });
  }
});


router.post("/guardar", async (req, res) => {
  const { producto, precio } = req.body;

  if (!producto || typeof producto !== 'string') {
    return res.status(400).json({ error: 'El campo "producto" es obligatorio y debe ser una cadena de texto.' });
  }
  
  if (precio == null || typeof precio !== 'number') {
    return res.status(400).json({ error: 'El campo "precio" es obligatorio y debe ser un número.' });
  }

  try {
    const nuevoProducto = await ModelTienda.create({ producto, precio });
    res.status(201).json(nuevoProducto); // Responder con el documento creado
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Hubo un problema al crear el producto.' });
  }
});

router.delete("/eliminar/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id es "+id);
  
  try {
    const productoEliminado = await ModelTienda.findByIdAndDelete(id);
    
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    res.status(200).json({ mensaje: 'Producto eliminado.' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Hubo un problema al eliminar el producto.' });
  }
});

module.exports = router;