import React, { useState } from 'react';
import '../styles/addItemList.css';
import Button from './ui/BaseButton';
import DeleteIcon from '../assets/icon-delete.svg';

const AddItemList = ({ onItemsChange }) => {
  const [items, setItems] = useState([{ id: Date.now(), name: '', quantity: '', price: '', total: 0 }]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: '', price: '', total: 0 }]);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id, key, value) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, [key]: value } : item
    );

    const updatedItemsWithTotal = updatedItems.map(item => ({
      ...item,
      total: item.quantity * item.price
    }));

    setItems(updatedItemsWithTotal);

    onItemsChange(updatedItemsWithTotal);
  };

  return (
    <div className="item-list-container">
      <h4 className="modal-bill-headers item-header">Item List</h4>
      
      {items.length >= 1 && (
        <div className="item-labels">
          <label className="item-name-label">Item Name</label>
          <label className="item-quantity-label">Qty.</label>
          <label className="item-price-label">Price</label>
          <label className='item-total-label'>Total</label>
        </div>
      )}

      {items.map(item => (
        <div className="item-list" key={item.id}>
          <input 
            type="text" 
            className="item-name" 
            value={item.name} 
            onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} 
          />
          <input 
            type="number" 
            className="item-quantity" 
            value={item.quantity} 
            onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))} 
          />
          <input 
            type="number" 
            className="item-price" 
            value={item.price} 
            onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))} 
          />
          <span className="item-total">${item.total.toFixed(2)}</span>
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
