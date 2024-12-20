import React from "react";
import { Link } from 'react-router-dom';
import "../css/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">FashionShop</Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/products">Productos</Link>
                </li>
                <li>
                    <Link to="/about">Nosotros</Link>
                </li>
                <li>
                    <Link to="/contact">Contacto</Link>
                </li>
            </ul>
            <div className="cta">
                <Link to="/cart" className="cart-link">
                    🛒 Cart
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;