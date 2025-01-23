'use client';

import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { CartProvider, MedusaProvider } from 'medusa-react';
// import { CartProvider } from '../contexts/CartContext';

export const MedusaProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl="http://localhost:9000"
      publishableApiKey={process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}
      customHeaders={{
        'x-no-compression': true,
      }}
    >
      <CartProvider>{children}</CartProvider>
    </MedusaProvider>
  );
};
