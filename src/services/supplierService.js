const API_URL = "/api/suppliers";

export const fetchSuppliers = async () => {
  // Placeholder for fetch call
  return [
    {
      id: 1,
      name: "Global Supplies",
      address: "1234 Market St, San Francisco, CA 94103",
      email: "info@globalsupplies.com",
      vatNumber: "US123456789",
      euVatNumber: "EU987654321",
      phone: "415-555-0123",
      contactPerson: "John Doe",
      contactNo: "415-555-0133",
      contactEmail: "jdoe@globalsupplies.com",
      paymentMethod: "Bank Transfer",
      paymentCurrency: "USD",
      bankAccount1: "800123456",
      bankAccount2: "800234567",
      bankAccount3: "800345678",
    },
    {
      id: 2,
      name: "Quality Goods Inc.",
      address: "2345 Walnut St, Philadelphia, PA 19103",
      email: "support@qualitygoods.com",
      vatNumber: "US987654321",
      euVatNumber: "EU123456789",
      phone: "215-555-0223",
      contactPerson: "Jane Smith",
      contactNo: "215-555-0323",
      contactEmail: "jsmith@qualitygoods.com",
      paymentMethod: "Credit Card",
      paymentCurrency: "EUR",
      bankAccount1: "801234567",
      bankAccount2: "801345678",
      bankAccount3: "801456789",
    },
    // ...additional supplier entries...
    // Make sure to use unique id for each supplier
    {
      id: 3,
      name: "Tech Distributions",
      address: "..." /* ... other fields ... */,
    },
    {
      id: 4,
      name: "Office Supplies Co.",
      address: "..." /* ... other fields ... */,
    },
    {
      id: 5,
      name: "Industrial Solutions",
      address: "..." /* ... other fields ... */,
    },
    {
      id: 6,
      name: "Home Essentials Inc.",
      address: "..." /* ... other fields ... */,
    },
    { id: 7, name: "Gourmet Foods", address: "..." /* ... other fields ... */ },
    {
      id: 8,
      name: "Automotive Parts Ltd.",
      address: "..." /* ... other fields ... */,
    },
    {
      id: 9,
      name: "Building Materials Corp.",
      address: "..." /* ... other fields ... */,
    },
    {
      id: 10,
      name: "Fashion and Apparel",
      address: "..." /* ... other fields ... */,
    },
    {
      id: 11,
      name: "Electronics and More",
      address: "..." /* ... other fields ... */,
    },
    {
      id: 12,
      name: "Toys and Games Universe",
      address: "..." /* ... other fields ... */,
    },
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
