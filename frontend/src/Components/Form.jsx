import React from 'react';
import Button from './Button';
import MiddleText from './MiddleText';
import Loader from './Loader';

const Form = ({ title, fields, onSubmit, submitLabel, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
      <MiddleText text={title} />
      {fields.map(field => (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          <input
            {...field}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {field.extra}
        </div>
      ))}
      <Button
        type="submit"
       color='secondary' className='w-full'
        disabled={isLoading} 
      >
        {isLoading ? <Loader /> : submitLabel} 
      </Button>
    </form>
  );
};

export default Form;