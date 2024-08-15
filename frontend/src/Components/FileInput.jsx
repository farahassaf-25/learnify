import React from 'react';

const FileInput = ({ handleImageChange }) => {
  return (
    <input
      type="file"
      onChange={handleImageChange}
      className="file-input file-input-bordered file-input-secondary w-full" 
    />
  );
};

export default FileInput;
