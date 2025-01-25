import LocalizedClientLink from '@/components/elements/localized-link';
import { cn } from '@/lib/utils';
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className={cn('text-9xl font-bold text-gray-800')}>404</h1>
      <p className="mt-4 text-2xl font-medium text-gray-600">Page Not Found</p>
      <p className="mt-2 text-lg text-gray-500">
        The page you are looking for does not exist.
      </p>
      <LocalizedClientLink
        href="/"
        className="px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Go Back Home
      </LocalizedClientLink>
    </div>
  );
};

export default NotFound;
