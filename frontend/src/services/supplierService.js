import axios from 'axios';

const API_BASE_URL = 'http://localhost:6060/api/v1'; // Replace with your actual base URL

export const supplierService = {
  insertSupplier(supplierData) {
    return axios.post(`${API_BASE_URL}/suppliers`, {
      action: 'insertOne',
      data: supplierData
    });
  },

  getAllSuppliers() {
    return axios.post(`${API_BASE_URL}/suppliers`, {
      action: 'getAll',
      data: {}
    });
  },

  getSupplierByName(name) {
    return axios.post(`${API_BASE_URL}/suppliers`, {
      action: 'getOne',
      data: { supplierName: name }
    });
  },

  searchSuppliers(searchCriteria) {
    return axios.post(`${API_BASE_URL}/suppliers/search`, {
      action: 'search',
      data: searchCriteria
    });
  }
};
