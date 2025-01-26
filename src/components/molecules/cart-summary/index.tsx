'use client';
import Button from '@/components/elements/button';
import LocalizedClientLink from '@/components/elements/localized-link';
import { HttpTypes } from '@medusajs/types';

const CartSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-gray-light">
      <h2 className="mb-4 text-xl font-bold text-gray-dark">Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${(cart.subtotal / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${(cart.shipping_total / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>${(cart.tax_total / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${(cart.total / 100).toFixed(2)}</span>
        </div>
      </div>
      <LocalizedClientLink href="/checkout">
        <Button
          title="Go to Checkout"
          className="w-full py-3 mt-6 text-xl font-bold text-gray-light transition rounded-lg cursor-pointer !bg-black hover:!bg-gray-dark hover:text-white"
          size="lg"
          shadowStrength="md"
        />
      </LocalizedClientLink>
    </div>
  );
};

export default CartSummary;
