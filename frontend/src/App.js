// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/layout/Navbar";
import ProductsPage from "./components/products/ProductsPage";
import SuppliersPage from "./components/suppliers/SuppliersPage";
import CustomersPage from "./components/customers/CustomersPage";
import OrdersPage from "./components/orders/OrdersPage";
import DeliveryNotesPage from "./components/deliveryNotes/DeliveryNotesPage";
import IncomingGoodsPage from "./components/incomingGoods/IncomingGoodsPage"; // Make sure you have this page component

import "./i18n/i18n"; // Ensure i18n is initialized
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/delivery-notes" element={<DeliveryNotesPage />} />
        <Route path="/incoming-goods" element={<IncomingGoodsPage />} />

        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
