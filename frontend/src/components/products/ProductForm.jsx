// src/components/products/ProductForm.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductForm = ({ onSave }) => {
  const { t } = useTranslation();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
    // Reset form if necessary
    setProduct({
      name: '',
      price: '',
      category: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{t('productForm.name')}</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>{t('productForm.price')}</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>{t('productForm.category')}</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{t('productForm.save')}</button>
    </form>
  );
};

export default ProductForm;
