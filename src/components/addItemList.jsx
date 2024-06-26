import React, { useState, useEffect } from "react";
import "../styles/addItemList.css";
import Button from "./ui/BaseButton";
import DeleteIcon from "../assets/icon-delete.svg";

const AddItemList = ({ initialItems = [], onItemsChange }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      quantity: "",
      price: "",
      total: 0,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    onItemsChange(newItems);
  };

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    onItemsChange(newItems);
  };

  const handleItemChange = (id, key, value) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [key]: value } : item
    );

    const updatedItemsWithTotal = updatedItems.map((item) => ({
      ...item,
      total: item.quantity * item.price,
    }));

    setItems(updatedItemsWithTotal);
    onItemsChange(updatedItemsWithTotal);
  };

  return (
    <div className="item-list-container">
      <h4 className="modal-bill-headers item-header">Item List</h4>

      {items.length > 0 && (
        <div className="item-labels">
          <label className="item-name-label">Item Name</label>
          <label className="item-quantity-label">Qty.</label>
          <label className="item-price-label">Price</label>
          <label className="item-total-label">Total</label>
        </div>
      )}

      {items.map((item) => (
        <>
          <div className="item-list" key={item.id}>
            <input
              type="text"
              className="item-name"
              value={item.name}
              onChange={(e) =>
                handleItemChange(item.id, "name", e.target.value)
              }
            />
            <input
              type="number"
              className="item-quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(item.id, "quantity", Number(e.target.value))
              }
            />
            <input
              type="number"
              className="item-price"
              value={item.price}
              onChange={(e) =>
                handleItemChange(item.id, "price", Number(e.target.value))
              }
            />
            <span className="item-total">${item.total.toFixed(2)}</span>
            <button className="delete-item" onClick={() => deleteItem(item.id)}>
              <img src={DeleteIcon} alt="Delete" />
            </button>
          </div>

          <div className="item-list-mobile" key={item.id}>
            <div className="mobile-item-name-cont">
              <label htmlFor="item-name" className="item-name-label">
                Item Name
              </label>
              <input
                type="text"
                className="item-name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(item.id, "name", e.target.value)
                }
              />
            </div>

            <div className="mobile-name-qty-price">
              <div className="mobile-item-qty-cont">
                <label htmlFor="item-quantity" className="item-quantity-label">
                  Qty.
                </label>

                <input
                  type="number"
                  className="item-quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      item.id,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                />
              </div>
              <div className="mobile-item-price-cont">
                <label htmlFor="item-price" className="item-price-label">
                  Price
                </label>
                <input
                  type="number"
                  className="item-price"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(item.id, "price", Number(e.target.value))
                  }
                />
              </div>

              <div className="mobile-item-total-cont">
                <label htmlFor="item-total" className="item-total-label">
                  Total
                </label>
                <span className="item-total">${item.total.toFixed(2)}</span>

              </div>
              <button
                className="delete-item"
                onClick={() => deleteItem(item.id)}
              >
                <img src={DeleteIcon} alt="Delete" />
              </button>
            </div>
          </div>
        </>
      ))}

      <Button
        className="add-new-item-btn"
        buttonText="+ Add New Item"
        onClick={addItem}
      />
    </div>
  );
};

export default AddItemList;
