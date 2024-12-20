const Producto = require('../models/producto');

const getAllProducts = async (req, res) => {
    try {
        const products = await Producto.find();
        res.json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

const getProductById = (req, res) => {
    res.send(`Producto con id ${req.params.id}`);
};

const createProduct = async (req, res) => {
    try {
        const { nombre, categoria, precio, cantidadStock, descripcion, imagen } = req.body;
        
        if (!nombre || !categoria || !precio || !cantidadStock || !descripcion || !imagen) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const newProduct = new Producto({
            nombre,
            categoria,
            precio,
            cantidadStock,
            descripcion,
            imagen
        });
        
        await newProduct.save();
        
        res.status(201).json({
            message: 'Producto creado exitosamente',
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        await Producto.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json({ message: "Producto actualizado" });
      } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error });
        console.log(error);
      }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Producto.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
          return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado" });
      } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
        console.log(error);
      }
};

const getLowStockProducts = async (req, res) => {
    const { cantidadStockToSearch } = req.query;
    try {
        const products = await Producto.find({ cantidadStock: { $lte: cantidadStockToSearch } });
        res.json(products);
    } catch (error) {
        console.error('Error al obtener los productos de bajo inventario:', error);
        res.status(500).json({ message: 'Error al obtener los productos de bajo inventario' });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const products = await Producto.find({ categoria: category });
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        res.status(500).json({ message: 'Error al obtener productos por categoría' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct,
    getLowStockProducts,
    getProductsByCategory
};