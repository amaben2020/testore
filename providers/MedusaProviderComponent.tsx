'use client';

import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { CartProvider, MedusaProvider } from 'medusa-react';

// NB: This is used to pull in data in client side components

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
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={process.env.MEDUSA_BACKEND_URL!}
      publishableApiKey={process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}
      customHeaders={{
        'x-no-compression': true,
      }}
    >
      <CartProvider>{children}</CartProvider>
    </MedusaProvider>
  );
};
