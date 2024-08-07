import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-bgColor">
      {children}
    </div>
  );
}

export default MainLayout;
