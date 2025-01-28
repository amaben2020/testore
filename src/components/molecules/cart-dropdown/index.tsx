'use client';

import React from 'react';
import Image from 'next/image';
import LocalizedClientLink from '@/components/elements/localized-link';
import { convertToLocale } from '@/lib/util/money';

import { HttpTypes } from '@medusajs/types';
import Trash from '@/components/icons/trash';
import { deleteLineItem, updateLineItem } from '@/services/cart';

const CartDropdown = ({
  cartItems,
  onCartUpdate,
  onClose,
}: {
  cartItems: HttpTypes.StoreCart['items'];
  onCartUpdate: () => void;
  onClose: () => void;
}) => {
  const handleIncreaseQuantity = async (lineId: string, quantity: number) => {
    try {
      await updateLineItem({ lineId, quantity: quantity + 1 });
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (lineId: string, quantity: number) => {
    try {
      if (quantity > 1) {
        await updateLineItem({ lineId, quantity: quantity - 1 });
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        await deleteLineItem(lineId);
        window.dispatchEvent(new Event('cartUpdated'));
      }
      // onCartUpdate(); // Refresh cart items after updating
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    try {
      await deleteLineItem(lineId);
      onCartUpdate();
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-80">
      <div className="p-4">
        <h3 className="mb-4 text-lg font-semibold">Cart</h3>
        {Number(cartItems?.length) > 0 ? (
          <div className="space-y-4">
            {cartItems?.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <Image
                  src={item.thumbnail!}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(item.id, item.quantity)
                      }
                      className="px-2 py-1 bg-gray-100 rounded-lg"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(item.id, item.quantity)
                      }
                      className="px-2 py-1 bg-gray-100 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {convertToLocale({
                      amount: item.unit_price * item.quantity,
                      currency_code: 'usd', // Replace with dynamic currency
                    })}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <p className="flex justify-between text-gray-600">
            <span>Subtotal (excl. taxes):</span>
            <span className="font-semibold">
              {convertToLocale({
                amount: cartItems!.reduce(
                  (total, item) => total + item.unit_price * item.quantity,
                  0
                ),
                currency_code: 'usd', // Replace with dynamic currency based on region
              })}
            </span>
          </p>
          <LocalizedClientLink
            href="/cart"
            className="block w-full py-2 mt-4 text-center text-white bg-black rounded-lg cursor-pointer hover:bg-gray-dark"
            onClick={onClose}
          >
            Go to Cart
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
