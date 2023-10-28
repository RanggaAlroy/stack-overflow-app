import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-center flex w-full items-center justify-center">
      {children}
    </main>
  );
};

export default layout;
