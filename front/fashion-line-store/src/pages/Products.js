import React from "react";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Products() {
  const allProducts = [
    {
      id: 1,
      name: "Vestido Casual",
      price: 45,
      image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d",
    },
    {
      id: 2,
      name: "Chaqueta de Cuero",
      price: 120,
      image: "https://images.unsplash.com/photo-1567769544603-6d1f0e6b655f",
    },
    {
      id: 3,
      name: "Bolso de Moda",
      price: 60,
      image: "https://images.unsplash.com/photo-1593034091735-512f74cdb6f3",
    },
  ];

  return (
    <div>
      <h2>Nuestros Productos</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Products;