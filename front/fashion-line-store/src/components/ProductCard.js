import React from "react";
import "../css/ProductCard.css";
import axios from "axios";
import Modal from "react-modal";
import { useEffect, useState } from "react";

function ProductCard({ product, onUpdate }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/fashionLine/${product._id}`);
      alert('Producto eliminado');
      window.location.reload(true);
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  };

  const handleUpdate = () => {
    onUpdate(product);
  };

  return (
    <div className="product-card">
      <img src={product.imagen} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <h3>Stock: {product.cantidadStock}</h3>
      <h3>Categoria: {product.categoria}</h3>
      <p>${product.precio}</p>
      <button>Añadir al carrito</button>
      <button onClick={handleUpdate}>Actualizar</button>
      <button onClick={openDeleteModal}>Eliminar</button>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirmar eliminación"
        className="delete-modal-content"
        overlayClassName="delete-modal-overlay"
      >
        <h2>¿Estás seguro de que deseas eliminar este producto?</h2>
        <p className="product-name">{product.nombre}</p>
        <div className="modal-buttons">
          <button onClick={handleDelete} className="confirm-button">
            Sí, eliminar
          </button>
          <button onClick={closeDeleteModal} className="cancel-button">
            Cancelar
          </button>
        </div>
      </Modal>

    </div>
  );
}

export default ProductCard;