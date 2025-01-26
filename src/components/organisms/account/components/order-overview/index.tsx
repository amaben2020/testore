'use client';

import { Button } from '@medusajs/ui';

import OrderCard from '../order-card';

import { HttpTypes } from '@medusajs/types';
import LocalizedClientLink from '@/components/elements/localized-link';

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col w-full gap-y-8">
        {orders.map((o) => (
          <div
            key={o.id}
            className="pb-6 border-b border-gray-200 last:pb-0 last:border-none"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center w-full gap-y-4"
      data-testid="no-orders-container"
    >
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any orders yet, let us change that {':)'}
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button data-testid="continue-shopping-button">
            Continue shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderOverview;
