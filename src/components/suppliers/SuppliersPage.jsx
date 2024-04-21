import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SupplierTable from './SupplierTable';
import SupplierForm from './SupplierForm';
import { fetchSuppliers } from '../../services/supplierService';

const SuppliersPage = () => {
  const { t } = useTranslation();
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Replace this with a call to your API
    setSuppliers(fetchSuppliers());
  }, []);

  return (
    <div>
      <h1>{t('supplier.title')}</h1>
      <SupplierForm />
      <SupplierTable suppliers={suppliers} />
    </div>
  );
};

export default SuppliersPage;
