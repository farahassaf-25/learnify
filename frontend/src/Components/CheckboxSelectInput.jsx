import React, { useState, useEffect, useRef } from 'react';

const CheckboxSelectInput = ({ options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState(selectedOptions);
  const dropdownRef = useRef(null);

  const handleOptionChange = (option) => {
    const updatedCheckedOptions = checkedOptions.includes(option)
      ? checkedOptions.filter((item) => item !== option)
      : [...checkedOptions, option];

    setCheckedOptions(updatedCheckedOptions);
  };

  const handleApply = () => {
    setSelectedOptions(checkedOptions);
    setIsOpen(false);
  };

  const handleClear = () => {
    setCheckedOptions([]);
    setSelectedOptions([]);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-4" ref={dropdownRef}>
      <button 
        className="select select-bordered w-full md:w-auto border-secondary flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {checkedOptions.length > 0 ? `${checkedOptions.length} selected` : 'Categories'}
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-gray-300 mt-1 rounded shadow-lg z-10 w-full">
          <div className="p-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={checkedOptions.includes(option.value)}
                  onChange={() => handleOptionChange(option.value)}
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between p-2">
            <button className="text-blue-500" onClick={handleClear}>Clear</button>
            <button className="text-blue-500" onClick={handleApply}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckboxSelectInput;
