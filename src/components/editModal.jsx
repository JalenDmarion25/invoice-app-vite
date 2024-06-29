import React, { useState, useEffect } from "react";
import Button from "./ui/BaseButton";
import Calendar from "../components/calender";
import toast, { Toaster } from "react-hot-toast";
import DropdownModal from "./dropdownModal";
import AddItemList from "./addItemList";
import "../styles/modal.css";

const EditModal = ({ handleCloseModal, invoiceDetail }) => {
  const [formData, setFormData] = useState({
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientName: "",
    clientEmail: "",
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    createdAt: "",
    paymentDue: "",
    description: "",
    items: [],
    status: "draft",
  });

  useEffect(() => {
    if (invoiceDetail) {
      setFormData(invoiceDetail);
    }
  }, [invoiceDetail]);

  const handleBackgroundClick = (event) => {
    if (event.target.className === "modal-background") {
      handleCloseModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, field, nestedField) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [nestedField]: value,
      },
    }));
  };

  const handleItemsChange = (items) => {
    setFormData((prevData) => ({
      ...prevData,
      items,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "senderAddress.street",
      "senderAddress.city",
      "senderAddress.postCode",
      "senderAddress.country",
      "clientName",
      "clientEmail",
      "clientAddress.street",
      "clientAddress.city",
      "clientAddress.postCode",
      "clientAddress.country",
      "createdAt",
      "paymentDue",
      "description",
      "items",
    ];

    for (const field of requiredFields) {
      const fieldValue = getFieldByString(formData, field);
      if (!fieldValue) {
        return false;
      }
    }
    return true;
  };

  const getFieldByString = (object, fieldString) => {
    const fields = fieldString.split(".");
    let fieldValue = { ...object };
    for (const f of fields) {
      fieldValue = fieldValue[f];
    }
    return fieldValue;
  };

  const handleSubmit = (status) => {
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const existingData = JSON.parse(sessionStorage.getItem("jsonData")) || [];

    const updatedData = existingData.map((item) => {
      if (item.id === invoiceDetail.id) {
        return {
          ...formData,
          status: status === "pending" ? "pending" : formData.status,
        };
      }
      return item;
    });

    sessionStorage.setItem("jsonData", JSON.stringify(updatedData));

    toast.success("Changes saved successfully.");

    handleCloseModal();

    window.location.href = `/invoice-app-vite/`;
  };

  return (
    <section className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-new-container">
        <div className="new-form-container">
          <h2>Edit #{invoiceDetail.id}</h2>

          <div className="new-invoice-bill-from">
            <h4 className="modal-bill-headers">Bill From</h4>
            <div className="bill-from-adi-container">
              <label htmlFor="billFrom-street">Street Address</label>
              <input
                type="text"
                name="street"
                className="invoice-inputs single-line-input"
                value={formData.senderAddress.street}
                onChange={(e) =>
                  handleNestedChange(e, "senderAddress", "street")
                }
              />
            </div>

            <div className="bill-from-city-post-country">
              <div className="bill-from-city">
                <label htmlFor="billFrom-city">City</label>
                <input
                  type="text"
                  name="city"
                  className="invoice-inputs three-shared-input"
                  value={formData.senderAddress.city}
                  onChange={(e) =>
                    handleNestedChange(e, "senderAddress", "city")
                  }
                />
              </div>
              <div className="bill-from-post">
                <label htmlFor="billFrom-postCode">Post Code</label>
                <input
                  type="text"
                  name="postCode"
                  className="invoice-inputs three-shared-input"
                  value={formData.senderAddress.postCode}
                  onChange={(e) =>
                    handleNestedChange(e, "senderAddress", "postCode")
                  }
                />
              </div>
              <div className="bill-from-country">
                <label htmlFor="billFrom-country">Country</label>
                <input
                  type="text"
                  name="country"
                  className="invoice-inputs three-shared-input"
                  value={formData.senderAddress.country}
                  onChange={(e) =>
                    handleNestedChange(e, "senderAddress", "country")
                  }
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
                name="street"
                className="invoice-inputs single-line-input"
                value={formData.senderAddress.street}
                onChange={(e) =>
                  handleNestedChange(e, "senderAddress", "street")
                }
              />
            </div>

            <div className="bill-from-city-post-country">
              <div className="bill-from-city">
                <label htmlFor="billFrom-city">City</label>
                <input
                  type="text"
                  name="city"
                  className="invoice-inputs two-shared-input"
                  value={formData.senderAddress.city}
                  onChange={(e) =>
                    handleNestedChange(e, "senderAddress", "city")
                  }
                />
              </div>
              <div className="bill-from-post">
                <label htmlFor="billFrom-postCode">Post Code</label>
                <input
                  type="text"
                  name="postCode"
                  className="invoice-inputs two-shared-input"
                  value={formData.senderAddress.postCode}
                  onChange={(e) =>
                    handleNestedChange(e, "senderAddress", "postCode")
                  }
                />
              </div>
            </div>
            <div className="bill-from-country">
                <label htmlFor="billFrom-country">Country</label>
                <input
                  type="text"
                  name="country"
                  className="invoice-inputs single-line-input"
                  value={formData.senderAddress.country}
                  onChange={(e) =>
                    handleNestedChange(e, "senderAddress", "country")
                  }
                />
              </div>
          </div>

          <div className="bill-to-container">
            <h4 className="modal-bill-headers">Bill To</h4>
            <div className="bill-to-client-name-container">
              <label htmlFor="billTo-clientName">Client's Name</label>
              <input
                type="text"
                name="clientName"
                className="invoice-inputs single-line-input"
                value={formData.clientName}
                onChange={handleChange}
              />
            </div>
            <div className="bill-to-client-mail-container">
              <label htmlFor="billTo-clientEmail">Client's Email</label>
              <input
                type="text"
                name="clientEmail"
                className="invoice-inputs single-line-input"
                value={formData.clientEmail}
                onChange={handleChange}
              />
            </div>
            <div className="bill-to-client-adi-container">
              <label htmlFor="billTo-street">Street Address</label>
              <input
                type="text"
                name="street"
                className="invoice-inputs single-line-input"
                value={formData.clientAddress.street}
                onChange={(e) =>
                  handleNestedChange(e, "clientAddress", "street")
                }
              />
            </div>

            <div className="bill-to-city-post-country">
              <div className="bill-to-city">
                <label htmlFor="billTo-city">City</label>
                <input
                  type="text"
                  name="city"
                  className="invoice-inputs three-shared-input"
                  value={formData.clientAddress.city}
                  onChange={(e) =>
                    handleNestedChange(e, "clientAddress", "city")
                  }
                />
              </div>
              <div className="bill-to-post">
                <label htmlFor="billTo-postCode">Post Code</label>
                <input
                  type="text"
                  name="postCode"
                  className="invoice-inputs three-shared-input"
                  value={formData.clientAddress.postCode}
                  onChange={(e) =>
                    handleNestedChange(e, "clientAddress", "postCode")
                  }
                />
              </div>
              <div className="bill-to-country">
                <label htmlFor="billTo-country">Country</label>
                <input
                  type="text"
                  name="country"
                  className="invoice-inputs three-shared-input"
                  value={formData.clientAddress.country}
                  onChange={(e) =>
                    handleNestedChange(e, "clientAddress", "country")
                  }
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
                name="clientName"
                className="invoice-inputs single-line-input"
                value={formData.clientName}
                onChange={handleChange}
              />
            </div>
            <div className="bill-to-client-mail-container">
              <label htmlFor="billTo-clientEmail">Client's Email</label>
              <input
                type="text"
                name="clientEmail"
                className="invoice-inputs single-line-input"
                value={formData.clientEmail}
                onChange={handleChange}
              />
            </div>
            <div className="bill-to-client-adi-container">
              <label htmlFor="billTo-street">Street Address</label>
              <input
                type="text"
                name="street"
                className="invoice-inputs single-line-input"
                value={formData.clientAddress.street}
                onChange={(e) =>
                  handleNestedChange(e, "clientAddress", "street")
                }
              />
            </div>

            <div className="bill-to-city-post-country">
              <div className="bill-to-city">
                <label htmlFor="billTo-city">City</label>
                <input
                  type="text"
                  name="city"
                  className="invoice-inputs two-shared-input"
                  value={formData.clientAddress.city}
                  onChange={(e) =>
                    handleNestedChange(e, "clientAddress", "city")
                  }
                />
              </div>
              <div className="bill-to-post">
                <label htmlFor="billTo-postCode">Post Code</label>
                <input
                  type="text"
                  name="postCode"
                  className="invoice-inputs two-shared-input"
                  value={formData.clientAddress.postCode}
                  onChange={(e) =>
                    handleNestedChange(e, "clientAddress", "postCode")
                  }
                />
              </div>
            </div>
            <div className="bill-to-country">
                <label htmlFor="billTo-country">Country</label>
                <input
                  type="text"
                  name="country"
                  className="invoice-inputs single-line-input"
                  value={formData.clientAddress.country}
                  onChange={(e) =>
                    handleNestedChange(e, "clientAddress", "country")
                  }
                />
              </div>
          </div>

          <div className="date-payment-container">
            <div className="invoice-date">
              <Calendar
                initialDate={formData.createdAt}
                onChange={(date) =>
                  setFormData((prevData) => ({ ...prevData, createdAt: date }))
                }
              />
            </div>
            <div className="payment-terms">
              <DropdownModal
                initialOption={{
                  text: `Net ${formData.paymentTerms} Day${
                    formData.paymentTerms > 1 ? "s" : ""
                  }`,
                  value: formData.paymentTerms,
                }}
                onChange={(value) =>
                  handleChange({ target: { name: "paymentTerms", value } })
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
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <AddItemList
            initialItems={formData.items}
            onItemsChange={handleItemsChange}
          />

          <div className="edit-modal-button-container">
            <Button
              className={"modal-cancel-btn"}
              onClick={() => handleCloseModal()}
              buttonText={"Cancel"}
            />
            <Button
              className={"modal-save-changes-btn"}
              onClick={() => handleSubmit("pending")}
              buttonText={"Save Changes"}
            />
          </div>
        </div>
      </div>
      <div className="edit-modal-button-container-mobile">
        <Button
          className={"modal-cancel-btn"}
          onClick={() => handleCloseModal()}
          buttonText={"Cancel"}
        />
        <Button
          className={"modal-save-changes-btn"}
          onClick={() => handleSubmit("pending")}
          buttonText={"Save Changes"}
        />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default EditModal;
