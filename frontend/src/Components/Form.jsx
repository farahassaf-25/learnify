import React from 'react';
import Button from './Button';
import MiddleText from './MiddleText';

const Form = ({ title, fields, onSubmit, submitLabel }) => {
  return (
    <div className="bg-white p-12 rounded-xl shadow-md w-full max-w-md">
      <MiddleText text={title} />
      <form onSubmit={onSubmit} className="space-y-8">
        {fields.map((field, index) => (
          <div key={index}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-textColor mb-2"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              className="w-full p-4 border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
            />
            {field.extra && <div className="mt-2">{field.extra}</div>}
          </div>
        ))}
        <Button color="secondary" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </div>
  );
};

export default Form;
