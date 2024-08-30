import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-bgColor px-30">
      {children}
    </div>
  );
}

export default MainLayout;
