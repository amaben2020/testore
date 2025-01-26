import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <section className="px-10 py-20">{children}</section>;
};

export default Layout;
