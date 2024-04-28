// src/components/products/ProductsPage.jsx
import React from 'react';
import ProductForm from './ProductForm';

const ProductsPage = () => {
  const handleSaveProduct = (productData) => {
    console.log('Product Saved', productData);
    // Here you would typically send the data to the server
  };

  return (
    <div>
      <h1>Products Page</h1>
      <ProductForm onSave={handleSaveProduct} />
      {/* Render other components like ProductList with static data here */}
    </div>
  );
};

export default ProductsPage;
