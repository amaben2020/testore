import Overview from '@/components/organisms/account/components/overview';
import { retrieveCustomer } from '@/lib/data/customer';
import { listOrders } from '@/lib/data/orders';
import { Metadata } from 'next';

import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Overview of your account activity.',
};

export default async function OverviewTemplate() {
  const customer = await retrieveCustomer().catch(() => null);
  const orders = (await listOrders().catch(() => null)) || null;

  if (!customer) {
    notFound();
  }

  return <Overview customer={customer} orders={orders} />;
}
