import Image from 'next/image';
import LocalizedClientLink from '@/components/elements/localized-link';
import { HttpTypes } from '@medusajs/types';
import PaymentAndShipping from '../../components/shipping/index';

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  if (!cart?.items || cart?.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <LocalizedClientLink
          href="/"
          className="px-6 py-2 mt-4 text-white rounded-lg bg-gray-dark hover:bg-gray-light"
        >
          Continue Shopping
        </LocalizedClientLink>
      </div>
    );
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Your Cart</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            {cart?.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-between pb-4 mb-4 border-b sm:flex-row"
              >
                {/* Product Image */}
                <div className="flex items-center w-full sm:w-auto">
                  <Image
                    src={item.thumbnail!}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(cart?.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${(cart?.tax_total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${(cart?.shipping_total).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(cart?.total).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <PaymentAndShipping cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
