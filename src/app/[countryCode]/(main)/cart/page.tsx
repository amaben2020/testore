import { retrieveCart } from '@/lib/data/cart';

import { retrieveCustomer } from '@/lib/data/customer';
import Banner from '@/components/elements/banner';

import EmptyCartMessage from '@/cart/components/empty-cart-message';
import CartTable from '@/components/molecules/cart-table';
import CartSummary from '@/components/molecules/cart-summary';

const CartPage = async () => {
  const cart = await retrieveCart();
  const customer = await retrieveCustomer();

  if (!cart?.items) {
    return <EmptyCartMessage />;
  }

  return (
    <section className="grid">
      {!customer && (
        <Banner
          title="Already have an account?"
          description="Sign in for a better experience."
          link={{
            text: 'Sign in',
            href: 'account',
          }}
        />
      )}
      <div className="container p-2 mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-gray-dark">Cart</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cart Table */}
          <div className="col-span-8">
            <CartTable cart={cart} />{' '}
          </div>

          {/* Summary Section */}
          <div className="col-span-4">
            <CartSummary cart={cart} />{' '}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
