import OrderOverview from '@/components/organisms/account/components/order-overview';
import TransferRequestForm from '@/components/organisms/account/components/transfer-request-form';
import { listOrders } from '@/services/orders';
import { Metadata } from 'next';

import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Overview of your previous orders.',
};

export default async function Orders() {
  const orders = await listOrders();

  if (!orders) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="flex flex-col mb-8 gap-y-4">
        <h1 className="text-2xl-semi">Orders</h1>
        <p className="text-base-regular">
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <br className="my-16" />
        <TransferRequestForm />
      </div>
    </div>
  );
}
