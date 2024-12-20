import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateProduct({ product, onCreate, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: 0,
    cantidadStock: 0,
    imagen: "",
    descripcion: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        categoria: product.categoria,
        precio: product.precio,
        cantidadStock: product.cantidadStock,
        imagen: product.imagen,
        descripcion: product.descripcion,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        // Actualizar producto
        if(!formData.nombre || !formData.categoria || !formData.precio || !formData.cantidadStock || !formData.imagen || !formData.descripcion) {
          alert("Todos los campos son obligatorios");
          return;  
        }
        if(formData.cantidadStock <= 0 || formData.precio <= 0) {
          alert("La cantidad en stock y el precio deben ser mayores a 0");
          return;
        }
        const updatedProduct = await axios.put(`http://localhost:3001/api/v1/fashionLine/${product._id}`, formData);
        alert("Producto actualizado");
        onCreate(updatedProduct.data);
      } else {
        // Crear producto
        if(!formData.nombre || !formData.categoria || !formData.precio || !formData.cantidadStock || !formData.imagen || !formData.descripcion) {
          alert("Todos los campos son obligatorios");
          return;  
        }
        if(formData.cantidadStock <= 0 || formData.precio <= 0) {
          alert("La cantidad en stock y el precio deben ser mayores a 0");
          return;
        }
        const newProduct = await axios.post("http://localhost:3001/api/v1/fashionLine", formData);
        alert("Producto creado");
        onCreate(newProduct.data);
      }
      onClose();
      window.location.reload(true);
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre del producto"
      />
      <input
        type="text"
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        placeholder="Categoria"
      />
      <input
        type="number"
        name="precio"
        value={formData.precio}
        onChange={handleChange}
        placeholder="Precio"
      />
      <input
        type="number"
        name="cantidadStock"
        value={formData.cantidadStock}
        onChange={handleChange}
        placeholder="Cantidad en stock"
      />
      <input
        type="text"
        name="imagen"
        value={formData.imagen}
        onChange={handleChange}
        placeholder="URL de la imagen"
      />
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción del producto"
      />
      <div class="center-container">
        <button type="submit">{product ? "Actualizar Producto" : "Crear Producto"}</button>
      </div>
    </form>
  );
}

export default CreateProduct;