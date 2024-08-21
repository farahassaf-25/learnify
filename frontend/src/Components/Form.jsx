import React from 'react';
import Button from './Button';
import MiddleText from './MiddleText';
import Loader from './Loader';
import TextInput from './TextInput';
import SelectInput from './SelectInput'; 

const Form = ({ title, fields, onSubmit, submitLabel, isLoading, showFileInput, handleImageChange, imagePreview }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-sm w-full max-w-lg mx-auto">
      <MiddleText text={title} />

      {/* Input Fields */}
      {fields.map((field, index) => {
        const { id, type, ...otherProps } = field;

        // Ensure that each field has a valid key and type
        const key = id || index; // Use id or fallback to index

        if (type === 'select') {
          return (
            <div key={key} className="mb-4">
              <SelectInput 
                label={field.label} 
                value={field.value} 
                onChange={field.onChange} 
                options={field.options}
              />
            </div>
          );
        }
        return (
          <div key={key} className="mb-4">
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <TextInput key={key} id={id} type={type} {...otherProps} />
          </div>
        );
      })}

      {/* File Input for Image Upload */}
      {showFileInput && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Image
          </label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="border rounded p-2 w-full" 
          />
          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="mt-2 w-20 h-20 object-cover rounded" 
            />
          )}
        </div>
      )}

      <Button type="submit" color="primary" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader /> : submitLabel}
      </Button>
    </form>
  );
};

export default Form;
