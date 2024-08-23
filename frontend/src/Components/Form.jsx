import React from 'react';
import Button from './Button';

const Form = ({ title, fields, onSubmit, submitLabel, isLoading }) => {
  return (
      <form onSubmit={onSubmit}>
          <h2 className="text-xl mb-4">{title}</h2>
          {fields.map((field) => (
              <div key={field.id} className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor={field.id}>
                      {field.label}
                  </label>
                  <input
                      id={field.id}
                      type={field.type}
                      value={field.value}
                      onChange={field.onChange}
                      className="border border-secondary rounded-md p-2 w-full"
                  />
              </div>
          ))}
          <Button
              type="submit"
              color='primary'
              className={` ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
          >
              {submitLabel}
          </Button>
      </form>
  );
};


export default Form;
