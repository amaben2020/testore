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

  if (!cart) {
    return notFound();
  }

  const customer = await retrieveCustomer();

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <h1>One last step {customer?.first_name}, Place your order</h1>
      <CheckoutSummary cart={cart} />
    </div>
  );
}
