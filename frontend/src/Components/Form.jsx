import React from 'react';
import Button from './Button';
import MiddleText from './MiddleText';
import Loader from './Loader';
import TextInput from './TextInput';
import FileInput from './FileInput';

const Form = ({ title, fields, onSubmit, submitLabel, isLoading, imagePreview, handleImageChange, showFileInput }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
      <MiddleText text={title} />

      {/* Input Fields */}
      {fields.map((field) => (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          <TextInput {...field} />
        </div>
      ))}

      {/* Conditionally Render File Input */}
      {showFileInput && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Image
          </label>
          <FileInput handleImageChange={handleImageChange} />
        </div>
      )}

      <Button type="submit" color="primary" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader /> : submitLabel}
      </Button>
    </form>
  );
};

export default Form;
