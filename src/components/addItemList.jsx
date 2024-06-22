import React, { useState } from 'react';
import '../styles/addItemList.css';
import Button from './ui/BaseButton';
import DeleteIcon from '../assets/icon-delete.svg';

const AddItemList = () => {
  const [items, setItems] = useState([{ id: Date.now(), name: '', quantity: 0, price: 0 }]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 0, price: 0 }]);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="item-list-container">
      <h4 className="modal-bill-headers item-header">Item List</h4>
      
      {items.length >= 1 && (
        <div className="item-labels">
          <label  className="item-name-label">Item Name</label>
          <label  className="item-quantity-label">Quantity</label>
          <label className="item-price-label">Price</label>
        </div>
      )}

      {items.map(item => (
        <div className="item-list" key={item.id}>
          <input type="text" className="item-name" />
          <input type="number" className="item-quantity" />
          <input type="number" className="item-price" />
          <span className="item-total">0</span>
          <button className="delete-item" onClick={() => deleteItem(item.id)}>
            <img src={DeleteIcon} alt="" />
          </button>
        </div>
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
