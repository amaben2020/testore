import CheckoutSummary from '@/components/organisms/checkout/templates/checkout-summary';
import { retrieveCart } from '@/lib/data/cart';
import { retrieveCustomer } from '@/lib/data/customer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default async function Checkout() {
  const cart = await retrieveCart();
  const customer = await retrieveCustomer();

  if (!cart) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] px-10  gap-x-40 py-7">
      <h2 className="text-2xl">
        One last step{' '}
        <span className="text-gray-dark">{customer?.first_name ?? 'User'}</span>
        , Place your order
      </h2>
      <CheckoutSummary cart={cart} />
    </div>
  );
}
