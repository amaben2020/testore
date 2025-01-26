'use client';

import LocalizedClientLink from '@/components/elements/localized-link';
import { XMark } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';

import React from 'react';
import OrderDetails from '../components/order-details';
import Items from '../components/items';
import ShippingDetails from '../components/shipping-details';
import OrderSummary from '../components/order-summary';
import Help from '../components/help';

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder;
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl-semi">Order details</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex items-center gap-2 text-ui-fg-subtle hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to overview
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col w-full h-full gap-4 bg-white"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
