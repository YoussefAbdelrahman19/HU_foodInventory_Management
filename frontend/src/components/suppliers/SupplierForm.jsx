import React, { useState, useRef, useCallback } from "react";

import { useTranslation } from "react-i18next";
import ConfirmationModal from "../common/ConfirmationModal";
import ToastNotification from "../common/ToastNotification";
import { useReactToPrint } from "react-to-print";
import { supplierService } from "../../services/supplierService"; // Ensure correct path

import styles from "./suppliers.module.css";
const SupplierForm = ({ initialSupplier = {}, onSave }) => {
  const { t } = useTranslation();
  const [supplier, setSupplier] = useState(initialSupplier);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const formRef = useRef();

  const validateField = (name, value) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [name]: t(`supplier.${name}Required`), // Using dynamic translation keys
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Current Field: ", name, "New Value: ", value); // Debugging line

    setSupplier({ ...supplier, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      setShowModal(true);
    }
  };

  const checkSupplierEmail = async (email) => {
    try {
      const response = await supplierService.checkEmailExists(email);
      return response.exists; // Assuming the endpoint returns { exists: true/false }
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSaveConfirmed = async () => {
    const emailExists = await checkSupplierEmail(supplier.email);
    if (emailExists) {
      setToastMessage(t("supplier.emailExistsError"));
      setToastType("error");
      setShowToast(true);
      return;
    }
    if (!supplier.supplierName) {
      setErrors((prev) => ({
        ...prev,
        supplierName: t("supplier.supplierNameRequired"),
      }));
      return;
    }
    setShowModal(false);
    const bankAccounts = [
      supplier.bankAccount1,
      supplier.bankAccount2,
      supplier.bankAccount3,
    ].filter((account) => account);
    const dataToSubmit = {
      ...supplier,
      supplierName: supplier.supplierName,
      address: supplier.address,
      ownerEmail: supplier.email,
      phoneNumber: supplier.phone,
      ownerPhoneNumber: supplier.contactNo,
      email: supplier.email,
      vat: supplier.vatNumber,
      euVat: supplier.euVatNumber,
      paymentMethod: supplier.paymentMethod,
      paymentCurrency: supplier.paymentCurrency,
      // bankAccount: bankAccounts||"",
      bankAccount: "",
    };

    console.log("Final data to submit:", dataToSubmit);
    supplierService
      .insertSupplier(dataToSubmit)
      .then((response) => {
        setToastMessage(t("supplier.savedSuccess"));
        setToastType("success");
        setShowToast(true);
        console.log(dataToSubmit);
      })
      .catch((error) => {
        setToastMessage(error.response?.data?.msg || t("supplier.saveError"));
        setToastType("error");
        setShowToast(true);
      });
  };
  const handlePrint = useReactToPrint({
    content: () => formRef.current,
    documentTitle: "Supplier Information",
  });

  return (
    <>
      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={() => handleSaveConfirmed()}
        // onSave={handleSaveConfirmed}
        centered // This prop will center the modal vertically
      />
      <ToastNotification
        show={showToast}
        message={toastMessage}
        type={toastType}
        centered
      />
      <form
        ref={formRef}
        className="form-horizontal"
        onSubmit={handleSubmit}
        style={{ padding: "20px" }}
      >
        {/* List of input fields */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="supplierName" className="form-label">
              {t("supplier.name")}
            </label>
            <input
              id="supplierName"
              className="form-control"
              type="text"
              name="supplierName"
              value={supplier.supplierName || ""}
              onChange={handleChange}
              minLength="2"
              maxLength="100"
            />
            {errors.supplierName && (
              <div className="text-danger">{errors.supplierName}</div>
            )}
          </div>

          <div className="col">
            <label htmlFor="supplierAddress" className="form-label">
              {t("supplier.address")}
            </label>
            <input
              id="supplierAddress"
              className="form-control"
              type="text"
              name="address"
              value={supplier.address || ""}
              onChange={handleChange}
              required
              minLength="5"
              maxLength="200"
            />
            {errors.address && (
              <div className="text-danger">{errors.address}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="supplierEmail" className="form-label">
              {t("supplier.email")}
            </label>
            <input
              id="supplierEmail"
              className="form-control"
              type="email"
              name="email"
              value={supplier.email || ""}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="supplierVatNumber" className="form-label">
              {t("supplier.vatNumber")}
            </label>
            <input
              id="supplierVatNumber"
              className="form-control"
              type="text"
              name="vatNumber"
              value={supplier.vatNumber || ""}
              onChange={handleChange}
              required
            />
            {errors.vatNumber && (
              <div className="text-danger">{errors.vatNumber}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="supplierEuVatNumber" className="form-label">
              {t("supplier.euVatNumber")}
            </label>
            <input
              id="supplierEuVatNumber"
              className="form-control"
              type="text"
              name="euVatNumber"
              value={supplier.euVatNumber || ""}
              onChange={handleChange}
              required
            />
            {errors.euVatNumber && (
              <div className="text-danger">{errors.euVatNumber}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="supplierPhone" className="form-label">
              {t("supplier.phone")}
            </label>
            <input
              id="supplierPhone"
              className="form-control"
              type="tel"
              name="phone"
              value={supplier.phone || ""}
              onChange={handleChange}
              required
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="supplierContactPerson" className="form-label">
              {t("supplier.contactPerson")}
            </label>
            <input
              id="supplierContactPerson"
              className="form-control"
              type="text"
              name="contactPerson"
              value={supplier.contactPerson || ""}
              onChange={handleChange}
              required
            />
            {errors.contactPerson && (
              <div className="text-danger">{errors.contactPerson}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="supplierContactNo" className="form-label">
              {t("supplier.contactNo")}
            </label>
            <input
              id="supplierContactNo"
              className="form-control"
              type="text"
              name="contactNo"
              value={supplier.contactNo || ""}
              onChange={handleChange}
              required
            />
            {errors.contactNo && (
              <div className="text-danger">{errors.contactNo}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="supplierContactEmail" className="form-label">
              {t("supplier.contactEmail")}
            </label>
            <input
              id="supplierContactEmail"
              className="form-control"
              type="email"
              name="contactEmail"
              value={supplier.contactEmail || ""}
              onChange={handleChange}
            />
            {errors.contactEmail && (
              <div className="text-danger">{errors.contactEmail}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="supplierPaymentMethod" className="form-label">
              {t("supplier.paymentMethod")}
            </label>
            <select
              id="supplierPaymentMethod"
              className="form-control"
              name="paymentMethod"
              value={supplier.paymentMethod || ""}
              onChange={handleChange}
              required
            >
              <option value="">{t("supplier.selectPaymentMethod")}</option>
              <option value="Visa">{t("supplier.visa")}</option>
              <option value="Bank Transfer">
                {t("supplier.bankTransfer")}
              </option>
              <option value="Cash">{t("supplier.cash")}</option>
            </select>
            {errors.paymentMethod && (
              <div className="text-danger">{errors.paymentMethod}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="supplierPaymentCurrency" className="form-label">
              {t("supplier.paymentCurrency")}
            </label>
            <select
              id="supplierPaymentCurrency"
              className="form-control"
              name="paymentCurrency"
              value={supplier.paymentCurrency || ""}
              onChange={handleChange}
              required
            >
              <option value="">{t("supplier.selectCurrency")}</option>
              <option value="HUF">{t("supplier.huf")}</option>
              <option value="EUR">{t("supplier.eur")}</option>
              <option value="USD">{t("supplier.usd")}</option>
              <option value="GBP">{t("supplier.gbp")}</option>
              <option value="JPY">{t("supplier.jpy")}</option>
              <option value="AUD">{t("supplier.aud")}</option>
              <option value="CAD">{t("supplier.cad")}</option>
              <option value="CHF">{t("supplier.chf")}</option>
              <option value="CNY">{t("supplier.cny")}</option>
              <option value="SEK">{t("supplier.sek")}</option>
              <option value="NZD">{t("supplier.nzd")}</option>
            </select>
            {errors.paymentCurrency && (
              <div className="text-danger">{errors.paymentCurrency}</div>
            )}
          </div>
        </div>
        {/* Additional fields, e.g., bank accounts */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="supplierBankAccount1" className="form-label">
              {t("supplier.bankAccount1")}
            </label>
            <input
              id="supplierBankAccount1"
              className="form-control"
              type="text"
              name="bankAccount1"
              value={supplier.bankAccount1 || ""}
              onChange={handleChange}
            />
            {errors.bankAccount1 && (
              <div className="text-danger">{errors.bankAccount1}</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="supplierBankAccount2" className="form-label">
              {t("supplier.bankAccount2")}
            </label>
            <input
              id="supplierBankAccount2"
              className="form-control"
              type="text"
              name="bankAccount2"
              value={supplier.bankAccount2 || ""}
              onChange={handleChange}
            />
            {errors.bankAccount2 && (
              <div className="text-danger">{errors.bankAccount2}</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="supplierBankAccount3" className="form-label">
              {t("supplier.bankAccount3")}
            </label>
            <input
              id="supplierBankAccount3"
              className="form-control"
              type="text"
              name="bankAccount3"
              value={supplier.bankAccount3 || ""}
              onChange={handleChange}
            />
            {errors.bankAccount3 && (
              <div className="text-danger">{errors.bankAccount3}</div>
            )}
          </div>
        </div>
        <div className={`d-flex justify-content-end gap-2 ${styles.noPrint}`}>
          <button
            className="btn btn-info"
            onClick={handlePrint}
            style={{ padding: "10px 30px", marginRight: "5px" }}
          >
            {t("supplier.print")}
          </button>
          <button
            className="btn btn-success"
            type="submit"
            style={{ padding: "10px 30px" }}
          >
            {t("supplier.save")}
          </button>
        </div>
      </form>
    </>
  );
};

export default SupplierForm;
