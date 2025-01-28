import Banner from '@/components/elements/banner';
import CheckoutSummary from '@/components/organisms/checkout/templates/checkout-summary';
import { retrieveCart } from '@/services/cart';
import { retrieveCustomer } from '@/services/customer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'This is where all purchased items are paid on order creation',
};

export default async function Checkout() {
  const customer = await retrieveCustomer();
  const cart = await retrieveCart();

  if (!cart) {
    return notFound();
  }

  return (
    <div
      className="grid grid-cols-1 small:grid-cols-[1fr_416px] px-10  gap-x-40 py-7"
      suppressHydrationWarning
    >
      <Banner
        title={`Hey 👋🏾, ${customer?.first_name ?? 'User'}`}
        description="One last step, make payment"
        link={{
          href: '/account',
          text: 'Sign in',
        }}
      />

      <CheckoutSummary cart={cart} />
    </div>
  );
}
