// MaterialInput.js
import React from 'react';

export const Input = ({ label, icon, ...restProps  }) => {
  return (
    <div className="material-input">
      {label && <label>{label}</label>}
      <div className="input-container">
        {icon && <i className="material-icons">{icon}</i>}
        <input {...restProps}/>
      </div>
    </div>
  );
};

