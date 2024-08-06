import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message, variant) => {
  toast[variant](message);
};

const Message = ({ variant, children }) => {
  React.useEffect(() => {
    notify(children, variant);
  }, [children, variant]);

  return <ToastContainer />;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
