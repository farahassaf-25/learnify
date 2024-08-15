import React from 'react';
import Button from './Button';
import MiddleText from './MiddleText';
import Loader from './Loader';
import TextInput from './TextInput';
import FileInput from './FileInput';
import { FaPen } from 'react-icons/fa';

const Form = ({ title, fields, onSubmit, submitLabel, isLoading, imagePreview, handleImageChange }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
      <MiddleText text={title} />

      {/* Image Display */}
      {imagePreview && handleImageChange && (
        <div className="flex justify-center items-center mb-6">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Image"
              className="w-48 h-48 rounded-full border-2 border-primary mb-4"
            />
            {/* File Input */}
            <FileInput onChange={handleImageChange} />
            <label
              htmlFor="image"
              className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
            >
              <FaPen />
            </label>
          </div>
        </div>
      )}

      {/* Input Fields */}
      {fields.map(field => (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          {field.type === 'file' ? (
            <FileInput />
          ) : (
            <TextInput {...field} />
          )}
          {field.extra}
        </div>
      ))}
      
      <Button
        type="submit"
        color='primary' 
        className='w-full'
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : submitLabel}
      </Button>
    </form>
  );
};

export default Form;
