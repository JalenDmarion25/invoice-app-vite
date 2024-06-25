import React, { useState, useEffect } from "react";
import ArrowDown from '../assets/icon-arrow-down.svg';
import "../styles/dropdownModal.css";

const dropdownModal = ({ initialOption = { text: 'Net 1 Day', value: 1 }, onChange }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialOption);

  useEffect(() => {
    setSelectedOption(initialOption);
  }, [initialOption]);

  const toggleVisibility = () => {
    setOptionsVisible(prevState => !prevState);
  }

  const handleOptionClick = (text, value) => {
    setSelectedOption({ text, value });
    setOptionsVisible(false);
    onChange(value);
  };

  return (
    <div className="dropdown-container">
      <div onClick={toggleVisibility} className="dropdown-input">
        {selectedOption.text}
        <img src={ArrowDown} className="dropdown-arrow-down" alt="Arrow Down" />
      </div>
      {optionsVisible && (
        <div className="dropdown-options">
          <div onClick={() => handleOptionClick('Net 1 Day', 1)} className="dropdown-option net-one">Net 1 Day</div>
          <div onClick={() => handleOptionClick('Net 7 Days', 7)} className="dropdown-option net-seven">Net 7 Days</div>
          <div onClick={() => handleOptionClick('Net 14 Days', 14)} className="dropdown-option net-fourteen">Net 14 Days</div>
          <div onClick={() => handleOptionClick('Net 30 Days', 30)} className="dropdown-option net-thirty">Net 30 Days</div>
        </div>
      )}
    </div>
  );
};

export default dropdownModal;
