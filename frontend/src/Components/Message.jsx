import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message, variant) => {
  console.log(`Notify called with message: ${message}, variant: ${variant}`); // Add logging
  switch (variant) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast.info(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    default:
      toast.info(message);
      break;
  }
};


const Message = ({ variant = 'info', children }) => {
  React.useEffect(() => {
    notify(children, variant);
  }, [children, variant]);

  return <ToastContainer />;
};

export default Message;
