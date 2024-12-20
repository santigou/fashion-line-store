const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router
    .get("/", productController.getAllProducts)
    .get("/lowstock", productController.getLowStockProducts)
    .get("/category", productController.getProductsByCategory)
    .get("/:id", productController.getProductById)
    .post("/", productController.createProduct)
    .put("/:id", productController.updateProduct)
    .delete("/:id", productController.deleteProduct);

module.exports = router;