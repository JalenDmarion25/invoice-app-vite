import React, { useState } from "react";
import Button from "./ui/BaseButton";
import toast, { Toaster } from "react-hot-toast";
import Calendar from "./calender";
import DropdownModal from "./dropdownModal";
import AddItemList from "./addItemList";
import "../styles/modal.css";

const NewModal = ({ handleCloseModal }) => {
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    billFrom: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    billTo: {
      clientName: "",
      clientEmail: "",
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    createdAt: getCurrentDate(),
    paymentDue: "",
    description: "",
    paymentTerms: 0,
    items: [],
    total: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split("-");

    if (section === "billFrom" || section === "billTo") {
      setFormData((prevData) => {
        const newFormData = {
          ...prevData,
          [section]: {
            ...prevData[section],
            [key]: value,
          },
        };
        return newFormData;
      });
    } else {
      setFormData((prevData) => {
        const newFormData = {
          ...prevData,
          [name]: value,
        };
        return newFormData;
      });
    }
  };

  const handleBackgroundClick = (event) => {
    if (event.target.className === "modal-background") {
      handleCloseModal();
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "billFrom.street",
      "billFrom.city",
      "billFrom.postCode",
      "billFrom.country",
      "billTo.clientName",
      "billTo.clientEmail",
      "billTo.street",
      "billTo.city",
      "billTo.postCode",
      "billTo.country",
      "description",
      "paymentTerms",
    ];

    for (const field of requiredFields) {
      const [section, key] = field.split(".");
      if (key) {
        if (!formData[section] || !formData[section][key]) {
          return false;
        }
      } else {
        if (!formData[field]) {
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = (status) => {
    if (status === "pending" && !validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const newInvoice = {
      id: generateID(),
      createdAt: formData.createdAt,
      paymentDue: paymentDueCalc(formData.paymentTerms, formData.createdAt),
      description: formData.description,
      paymentTerms: formData.paymentTerms,
      clientName: formData.billTo.clientName,
      clientEmail: formData.billTo.clientEmail,
      status: status,
      senderAddress: {
        street: formData.billFrom.street,
        city: formData.billFrom.city,
        postCode: formData.billFrom.postCode,
        country: formData.billFrom.country,
      },
      clientAddress: {
        street: formData.billTo.street,
        city: formData.billTo.city,
        postCode: formData.billTo.postCode,
        country: formData.billTo.country,
      },
      items: formData.items,
      total: calculateTotal(formData.items),
    };

    const storedData = JSON.parse(sessionStorage.getItem("jsonData")) || [];
    storedData.push(newInvoice);
    sessionStorage.setItem("jsonData", JSON.stringify(storedData));
    handleCloseModal();
    window.location.reload();
  };

  const generateID = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";

    let id;
    let exists;
    const storedData = JSON.parse(sessionStorage.getItem("jsonData")) || [];

    do {
      const randomLetters =
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));
      const randomDigits = Array.from({ length: 4 }, () =>
        digits.charAt(Math.floor(Math.random() * digits.length))
      ).join("");
      id = randomLetters + randomDigits;

      exists = storedData.some((invoice) => invoice.id === id);
    } while (exists);

    return id;
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.total, 0);
  };

  const paymentDueCalc = (paymentTerms, createdAt) => {
    const createdDate = new Date(createdAt);
    createdDate.setDate(createdDate.getDate() + parseInt(paymentTerms, 10));
    return createdDate.toISOString().split("T")[0];
  };

  return (
    <section className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-new-container">
        <div className="new-form-container">
          <h2>New Invoice</h2>

          <div className="new-invoice-bill-from">
            <h4 className="modal-bill-headers">Bill From</h4>
            <div className="bill-from-adi-container">
              <label htmlFor="billFrom-street">Street Address</label>
              <input
                type="text"
                name="billFrom-street"
                className="invoice-inputs single-line-input"
                onChange={handleInputChange}
              />
            </div>

            <div className="bill-from-city-post-country">
              <div className="bill-from-city">
                <label htmlFor="billFrom-city">City</label>
                <input
                  type="text"
                  name="billFrom-city"
                  className="invoice-inputs three-shared-input"
                  onChange={handleInputChange}
                />
              </div>
              <div className="bill-from-post">
                <label htmlFor="billFrom-postCode">Post Code</label>
                <input
                  type="text"
                  name="billFrom-postCode"
                  className="invoice-inputs three-shared-input"
                  onChange={handleInputChange}
                />
              </div>
              <div className="bill-from-country">
                <label htmlFor="billFrom-country">Country</label>
                <input
                  type="text"
                  name="billFrom-country"
                  className="invoice-inputs three-shared-input"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>


          <div className="new-invoice-bill-from-mobile">
            <h4 className="modal-bill-headers">Bill From</h4>
            <div className="bill-from-adi-container">
              <label htmlFor="billFrom-street">Street Address</label>
              <input
                type="text"
                name="billFrom-street"
                className="invoice-inputs single-line-input"
                onChange={handleInputChange}
              />
            </div>

            <div className="bill-from-city-post-country">
              <div className="bill-from-city">
                <label htmlFor="billFrom-city">City</label>
                <input
                  type="text"
                  name="billFrom-city"
                  className="invoice-inputs two-shared-input"
                  onChange={handleInputChange}
                />
              </div>
              <div className="bill-from-post">
                <label htmlFor="billFrom-postCode">Post Code</label>
                <input
                  type="text"
                  name="billFrom-postCode"
                  className="invoice-inputs two-shared-input"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="bill-from-country">
                <label htmlFor="billFrom-country">Country</label>
                <input
                  type="text"
                  name="billFrom-country"
                  className="invoice-inputs single-line-input"
                  onChange={handleInputChange}
                />
              </div>
          </div>


          <div className="bill-to-container">
            <h4 className="modal-bill-headers">Bill To</h4>
            <div className="bill-to-client-name-container">
              <label htmlFor="billTo-clientName">Client's Name</label>
              <input
                type="text"
                name="billTo-clientName"
                className="invoice-inputs single-line-input"
                onChange={handleInputChange}
              />
            </div>
            <div className="bill-to-client-mail-container">
              <label htmlFor="billTo-clientEmail">Client's Email</label>
              <input
                type="text"
                name="billTo-clientEmail"
                className="invoice-inputs single-line-input"
                onChange={handleInputChange}
              />
            </div>
            <div className="bill-to-client-adi-container">
              <label htmlFor="billTo-street">Street Address</label>
              <input
                type="text"
                name="billTo-street"
                className="invoice-inputs single-line-input"
                onChange={handleInputChange}
              />
            </div>

            <div className="bill-to-city-post-country">
              <div className="bill-to-city">
                <label htmlFor="billTo-city">City</label>
                <input
                  type="text"
                  name="billTo-city"
                  className="invoice-inputs three-shared-input"
                  onChange={handleInputChange}
                />
              </div>
              <div className="bill-to-post">
                <label htmlFor="billTo-postCode">Post Code</label>
                <input
                  type="text"
                  name="billTo-postCode"
                  className="invoice-inputs three-shared-input"
                  onChange={handleInputChange}
                />
              </div>
              <div className="bill-to-country">
                <label htmlFor="billTo-country">Country</label>
                <input
                  type="text"
                  name="billTo-country"
                  className="invoice-inputs three-shared-input"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>


          <div className="bill-to-container-mobile">
            <h4 className="modal-bill-headers">Bill To</h4>
            <div className="bill-to-client-name-container">
              <label htmlFor="billTo-clientName">Client's Name</label>
              <input
                type="text"
                name="billTo-clientName"
                className="invoice-inputs single-line-input"
                onChange={handleInputChange}
              />
            </div>
            <div className="bill-to-client-mail-container">
              <label htmlFor="billTo-clientEmail">Client's Email</label>
              <input
                type="text"
                name="billTo-clientEmail"
                className="invoice-inputs single-line-input"
                onChange={handleInputChange}
              />
            </div>
            <div className="bill-to-client-adi-container">
              <label htmlFor="billTo-street">Street Address</label>
              <input
                type="text"
                name="billTo-street"
                className="invoice-inputs single-line-input"
                onChange={handleInputChange}
              />
            </div>

            <div className="bill-to-city-post-country">
              <div className="bill-to-city">
                <label htmlFor="billTo-city">City</label>
                <input
                  type="text"
                  name="billTo-city"
                  className="invoice-inputs two-shared-input"
                  onChange={handleInputChange}
                />
              </div>
              <div className="bill-to-post">
                <label htmlFor="billTo-postCode">Post Code</label>
                <input
                  type="text"
                  name="billTo-postCode"
                  className="invoice-inputs two-shared-input"
                  onChange={handleInputChange}
                />
              </div>

            </div>
            <div className="bill-to-country">
                <label htmlFor="billTo-country">Country</label>
                <input
                  type="text"
                  name="billTo-country"
                  className="invoice-inputs single-line-input"
                  onChange={handleInputChange}
                />
              </div>
          </div>


          <div className="date-payment-container">
            <div className="invoice-date">
              <label>Invoice Date</label>
              <Calendar
                value={formData.createdAt}
                onChange={(date) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    createdAt: date,
                  }))
                }
              />
            </div>
            <div className="payment-terms">
              <label>Payment Terms</label>
              <DropdownModal
                initialOption={{
                  text: `Net ${formData.paymentTerms} Day${
                    formData.paymentTerms > 1 ? "s" : ""
                  }`,
                  value: formData.paymentTerms,
                }}
                onChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentTerms: value,
                  }))
                }
              />
            </div>
          </div>

          <div className="project-description-container">
            <label htmlFor="description">Project Description</label>
            <input
              type="text"
              name="description"
              className="invoice-inputs single-line-input"
              onChange={handleInputChange}
            />
          </div>

          <AddItemList
            initialItems={formData.items}
            onItemsChange={(items) =>
              setFormData((prevData) => ({
                ...prevData,
                items: items,
                total: calculateTotal(items),
              }))
            }
          />

          <div className="new-modal-button-container">
            <div>
              <Button
                className={"modal-discard-btn"}
                onClick={handleCloseModal}
                buttonText={"Discard"}
              />
            </div>
            <div>
              <Button
                className={"modal-save-draft-btn"}
                onClick={() => handleSubmit("draft")}
                buttonText={"Save as Draft"}
              />
              <Button
                className={"modal-save-send-btn"}
                onClick={() => handleSubmit("pending")}
                buttonText={"Save & Send"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="new-modal-button-container-mobile">
        <Button
          className={"modal-discard-btn"}
          onClick={handleCloseModal}
          buttonText={"Discard"}
        />

        <Button
          className={"modal-save-draft-btn"}
          onClick={() => handleSubmit("draft")}
          buttonText={"Save as Draft"}
        />
        <Button
          className={"modal-save-send-btn"}
          onClick={() => handleSubmit("pending")}
          buttonText={"Save & Send"}
        />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default NewModal;
