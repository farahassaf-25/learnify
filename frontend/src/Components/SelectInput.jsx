import React from 'react';

const SelectInput = ({ options, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <select 
        className="select select-bordered border-secondary w-full md:w-auto" 
        value={value} 
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
