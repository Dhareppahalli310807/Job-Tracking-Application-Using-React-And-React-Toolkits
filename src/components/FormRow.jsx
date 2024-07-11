import React from 'react';

const FormRow = ({ value, type, name, labelText, handleChange }) => {
  return (
    <div className='form-row'>
      <label
        htmlFor={name}
        className='form-label'
      >
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  );
};

export default FormRow;
