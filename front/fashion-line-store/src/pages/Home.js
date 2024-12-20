import React from "react";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import Modal from 'react-modal';
import CreateProduct from "./CreateProduct";
import { useEffect, useState } from "react";
import axios from 'axios';

Modal.setAppElement('#root');

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [lowStockThreshold, setLowStockThreshold] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/fashionLine');
                setFeaturedProducts(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const lowStock = featuredProducts.filter((product) => product.cantidadStock <= 25);
        setLowStockProducts(lowStock);
    }, [featuredProducts]);

    const handleLowStockFilter = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/fashionLine/lowstock', {
                params: { cantidadStockToSearch: lowStockThreshold }
            });
            setFeaturedProducts(response.data);
        } catch (error) {
            console.error('Error al filtrar productos de bajo inventario:', error);
        }
    };

    const handleCategoryFilter = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/fashionLine/category', {
                params: { category: selectedCategory }
            });
            setFeaturedProducts(response.data);
        } catch (error) {
            console.error('Error al filtrar productos por categoría: ' + selectedCategory, error);
        }
    };

    const handleUpdateProduct = (product) => {
        setProductToEdit(product);
        setIsUpdateModalOpen(true);
    };

    const handleCreateProduct = () => {
        setIsCreateModalOpen(true);
    };

    const handleProductCreation = (newProduct) => {
        setFeaturedProducts((prev) => [...prev, newProduct]);
        if (newProduct.cantidadStock <= 25) {
            setLowStockProducts((prev) => [...prev, newProduct]);
        }
        setIsCreateModalOpen(false);
    };

    const handleProductUpdate = (updatedProduct) => {
        setFeaturedProducts((prev) =>
            prev.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            )
        );

        if (updatedProduct.cantidadStock <= 25) {
            setLowStockProducts((prev) =>
                prev.some((product) => product._id === updatedProduct._id)
                    ? prev.map((product) =>
                          product._id === updatedProduct._id ? updatedProduct : product
                      )
                    : [...prev, updatedProduct]
            );
        } else {
            setLowStockProducts((prev) =>
                prev.filter((product) => product._id !== updatedProduct._id)
            );
        }
        setIsUpdateModalOpen(false);
    };

    return (
        <div>
            {lowStockProducts.length > 0 && (
                <div className="low-stock-alert">
                    <h3>⚠️ Alerta de Bajo Inventario</h3>
                    <ul>
                        {lowStockProducts.map((product) => (
                            <li key={product._id}>
                                {product.nombre} - Stock: {product.cantidadStock}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="buttons-container">
                <button className="btn-create-product" onClick={handleCreateProduct}>Crear Producto</button>
                <button className="btn-filter" onClick={handleLowStockFilter}>Filtrar Bajo Inventario</button>
                <input
                    className="input-stock"
                    type="number"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                    placeholder="Cantidad para Bajo Inventario"
                />
                <button onClick={handleCategoryFilter}>Filtrar por Categoría</button>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Selecciona una categoría</option>
                    {[...new Set(featuredProducts.map((product) => product.categoria))].map(
                        (category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        )
                    )}
                </select>
                <button className="btn-limpiar" onClick={() => window.location.reload()}>Limpiar Filtros</button>
            </div>

            <Modal
                isOpen={isCreateModalOpen}
                onRequestClose={() => setIsCreateModalOpen(false)}
                contentLabel="Crear Producto"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Crear Nuevo Producto</h2>
                <CreateProduct onCreate={handleProductCreation} onClose={() => setIsCreateModalOpen(false)} />
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button className="close-btn" onClick={() => setIsCreateModalOpen(false)}>Cerrar</button>
                </div>
            </Modal>

            <Modal
                isOpen={isUpdateModalOpen}
                onRequestClose={() => setIsUpdateModalOpen(false)}
                contentLabel="Actualizar Producto"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Actualizar Producto</h2>
                <CreateProduct product={productToEdit} onCreate={handleProductUpdate} onClose={() => setIsUpdateModalOpen(false)} />
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button className="close-btn" onClick={() => setIsUpdateModalOpen(false)}>Cerrar</button>
                </div>
            </Modal>

            <div className="product-grid">
                {featuredProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onUpdate={handleUpdateProduct}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Home;