import React from 'react';

const TextInput = ({ placeholder, type, value, onChange }) => {
  return (
    <label className="input input-bordered border-secondary flex items-center gap-2">
      <input
        type={type}
        className="grow p-2 focus:border-secondary"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default TextInput;