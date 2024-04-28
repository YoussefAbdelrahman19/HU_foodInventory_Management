const API_URL = '/api/suppliers';

export const fetchSuppliers = async () => {
  // Placeholder for fetch call
  return [
    // Static data for testing
    { id: 1, name: 'Supplier 1', address: 'Address 1', contact: 'Contact 1' },
    // Add more suppliers as needed
  ];
};

export const addSupplier = async (supplierData) => {
  // API call to add supplier
};

export const editSupplier = async (supplierId, supplierData) => {
  // API call to edit supplier
};

export const deleteSupplier = async (supplierId) => {
  // API call to delete supplier
};
