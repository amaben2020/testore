import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return <section className="px-6 py-5 lg:px-20 lg:py-10 ">{children}</section>;
};

export default layout;
