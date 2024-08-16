import React from 'react';
import Button from './Button';
import MiddleText from './MiddleText';
import Loader from './Loader';
import TextInput from './TextInput';
import FileInput from './FileInput';
import SelectInput from './SelectInput'; // Import the new SelectInput component

const Form = ({ title, fields, onSubmit, submitLabel, isLoading, showFileInput, fileInputLabel }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-sm w-full max-w-lg mx-auto">
      <MiddleText text={title} />
      
      {/* Input Fields */}
      {fields.map((field) => {
        if (field.type === 'select') {
          return (
            <div key={field.id} className="mb-4">
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
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <TextInput {...field} />
          </div>
        );
      })}
      
      {/* Conditionally Render File Input */}
      {showFileInput && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {fileInputLabel}
          </label>
          <FileInput />
        </div>
      )}

      <Button type="submit" color="primary" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader /> : submitLabel}
      </Button>
    </form>
  );
};

export default Form;
