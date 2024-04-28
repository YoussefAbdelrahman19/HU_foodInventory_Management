// import React, { useState, useEffect } from 'react';
// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { fetchSuppliers, deleteSupplier } from '../../services/supplierService'; // Update with your actual import path
// import { useTranslation } from 'react-i18next';

// function SupplierTableApp() {
//   const { t } = useTranslation();
//   const [suppliers, setSuppliers] = useState([]);
//   const [search, setSearch] = useState('');

// // Load suppliers on component mount
// useEffect(() => {
//   fetchSuppliers().then(data => setSuppliers(data));
// }, []);

//   // Implement the delete functionality
//   const handleDelete = (supplierId) => {
//     deleteSupplier(supplierId).then(() => {
//       setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
//     });
//   };

//   // Placeholder for edit functionality
//   const handleEdit = (supplierId) => {
//     console.log('Edit: ', supplierId);
//     // Implement editing logic here
//   };

//   // Placeholder for print functionality
//   const handlePrint = (supplierId) => {
//     console.log('Print: ', supplierId);
//     // Implement printing logic here
//   };

//   return (
//     <div className='container-fluid'>
//       <h1 className='text-center mt-4'>Supplier Table</h1>
//       <Form>
//         <InputGroup className='my-3'>
//           <Form.Control
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder='Search suppliers'
//           />
//         </InputGroup>
//       </Form>
//       <Table striped bordered hover className='rounded'>
//         <thead>
//         <tr>
//             <th>Name</th>
//             <th>Address</th>
//             <th>Email</th>
//             <th>VAT Number</th>
//             <th>EU VAT Number</th>
//             <th>Phone</th>
//             <th>Contact Person</th>
//             <th>Contact Number</th>
//             <th>Contact Email</th>
//             <th>Payment Method</th>
//             <th>Payment Currency</th>
//             <th>Bank Account 1</th>
//             <th>Bank Account 2</th>
//             <th>Bank Account 3</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {suppliers
//             .filter(supplier => {
//               const searchString = search.toLowerCase();
//               return searchString === '' ? true : supplier.name.toLowerCase().includes(searchString);
//             })
//             .map((supplier, index) => (
//               <tr key={supplier.id}>
//               <td>{supplier.name}</td>
//               <td>{supplier.address}</td>
//               <td>{supplier.email}</td>
//               <td>{supplier.vatNumber}</td>
//               <td>{supplier.euVatNumber}</td>
//               <td>{supplier.phone}</td>
//               <td>{supplier.contactPerson}</td>
//               <td>{supplier.contactNo}</td>
//               <td>{supplier.contactEmail}</td>
//               <td>{supplier.paymentMethod}</td>
//               <td>{supplier.paymentCurrency}</td>
//               <td>{supplier.bankAccount1}</td>
//               <td>{supplier.bankAccount2}</td>
//               <td>{supplier.bankAccount3}</td>              <td>
//                 <Button className='m-1' variant="primary" onClick={() => handleEdit(supplier.id)}>Edit</Button>{' '}
//                 <Button className='m-1' variant="danger" onClick={() => handleDelete(supplier.id)}>Delete</Button>{' '}
//                 <Button className='m-1' variant="info" onClick={() => handlePrint(supplier.id)}>Print</Button>
//               </td>
//             </tr>
//             ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default SupplierTableApp;
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { supplierService } from '../../services/supplierService'; // Correct import path
import { useTranslation } from 'react-i18next';

function SupplierTableApp() {
  const { t } = useTranslation();
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState('');

  // Load suppliers on component mount
  useEffect(() => {
    supplierService.getAllSuppliers().then(response => {
      // Assuming the API returns a structure as shown in your message
      const supplierData = response.data.suppliers; // Accessing the suppliers array from the response
      setSuppliers(supplierData || []); // Setting state or falling back to empty array if undefined
    }).catch(error => {
      console.error('Failed to fetch suppliers:', error);
      setSuppliers([]); // Fallback to empty array on error
    });
  }, []);

  // Implement the delete functionality
  const handleDelete = (supplierId) => {
    supplierService.deleteSupplier(supplierId).then(() => {
      setSuppliers(currentSuppliers => 
        currentSuppliers.filter(supplier => supplier.id !== supplierId)
      );
    }).catch(error => {
      console.error('Failed to delete supplier:', error);
    });
  };

  // Placeholder for edit functionality
  const handleEdit = (supplierId) => {
    console.log('Edit:', supplierId);
    // Implement editing logic here
  };

  // Placeholder for print functionality
  const handlePrint = (supplierId) => {
    console.log('Print:', supplierId);
    // Implement printing logic here
  };

  return (
    <Container fluid>
      <h1 className='text-center mt-4'>{t("supplier.title")}</h1>
      <Form>
        <InputGroup className='mb-3'>
          <Form.Control
            type="text"
            placeholder={t("supplier.searchPlaceholder")}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            {[
              "name", "address", "email", "vatNumber", "euVatNumber",
              "phone", "contactPerson", "contactNo", "contactEmail",
              "paymentMethod", "paymentCurrency", "bankAccount1",
              "bankAccount2", "bankAccount3", "actions"
            ].map(field => (
              <th key={field}>{t(`supplier.${field}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {suppliers?.filter(supplier => 
            !search || supplier.name.toLowerCase().includes(search.toLowerCase())
          ).map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.address}</td>
              <td>{supplier.email}</td>
              <td>{supplier.vatNumber}</td>
              <td>{supplier.euVatNumber}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.contactPerson}</td>
              <td>{supplier.contactNo}</td>
              <td>{supplier.contactEmail}</td>
              <td>{supplier.paymentMethod}</td>
              <td>{supplier.paymentCurrency}</td>
              <td>{supplier.bankAccount1}</td>
              <td>{supplier.bankAccount2}</td>
              <td>{supplier.bankAccount3}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(supplier.id)}>{t("supplier.edit")}</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(supplier.id)}>{t("supplier.delete")}</Button>{' '}
                <Button variant="info" onClick={() => handlePrint(supplier.id)}>{t("supplier.print")}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SupplierTableApp;
