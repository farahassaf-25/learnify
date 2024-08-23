import React, { useState } from 'react';

const InputField = ({ id, label, type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className="relative mb-4">
      <label htmlFor={id} className="block text-gray-900 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-secondary rounded bg-white focus:outline-none focus:ring-2 focus:ring-secondary pr-10"
      />
    </div>
  );
};

export default InputField;
