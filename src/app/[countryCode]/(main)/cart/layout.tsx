import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="px-5 py-5 border lg:px-10 lg:py-10">{children}</section>
  );
};

export default Layout;
