import React from 'react';

const SelectFormRow = ({
  name,
  labelText,
  options,
  optionsDefault,
  handleChange,
}) => {
  return (
    <div className='form-row'>
      <label
        htmlFor={name}
        className='form-label'
      >
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        value={optionsDefault}
        onChange={handleChange}
        className='form-select'
      >
        {options.map((item, index) => {
          return (
            <option
              key={index}
              value={item}
            >
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectFormRow;
