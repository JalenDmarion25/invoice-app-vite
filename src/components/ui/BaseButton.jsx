import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/index.css';

export const BaseButton = ({ buttonText, onClick, className, style }) => {
  const defaultClassName = 'default-button';
  const combinedClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return (
    <button
      className={combinedClassName}
      style={style}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

BaseButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

BaseButton.defaultProps = {
  onClick: () => {},
  className: '',
  style: {},
};

export default BaseButton;
