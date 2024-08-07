import React from 'react';

const InlineMessage = ({ variant, children }) => {
  let bgColor;

  switch (variant) {
    case 'info':
      bgColor = 'bg-blue-100 text-blue-700';
      break;
    case 'error':
      bgColor = 'bg-red-100 text-red-700';
      break;
    case 'success':
      bgColor = 'bg-green-100 text-green-700';
      break;
    default:
      bgColor = 'bg-gray-100 text-gray-700';
  }

  return (
    <div className={`p-4 rounded-md ${bgColor}`}>
      {children}
    </div>
  );
};

InlineMessage.defaultProps = {
  variant: 'info',
};

export default InlineMessage;
