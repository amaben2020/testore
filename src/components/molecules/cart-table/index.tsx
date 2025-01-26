'use client';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import { updateLineItem, deleteLineItem, retrieveCart } from '@/lib/data/cart';
import Button from '@/components/elements/button';

const CartTable = ({ cart }) => {
  const [isPending, startTransition] = useTransition();
  const [cartItems, setCartItems] = useState(cart.items);

  const handleQuantityChange = async (lineId, quantity) => {
    startTransition(async () => {
      await updateLineItem({ lineId, quantity });
      // Revalidate cart data
      const updatedCart = await retrieveCart();
      setCartItems(updatedCart.items);
    });
  };

  const handleRemoveItem = async (lineId) => {
    startTransition(async () => {
      await deleteLineItem(lineId);
      // Revalidate cart data
      const updatedCart = await retrieveCart();
      setCartItems(updatedCart.items);
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full">
        <thead className="bg-gray-light">
          <tr>
            <th className="px-4 py-2 text-left border-b text-gray-dark">
              Item
            </th>
            <th className="px-4 py-2 text-left border-b text-gray-dark">
              Quantity
            </th>
            <th className="px-4 py-2 text-left border-b text-gray-dark">
              Price
            </th>
            <th className="px-4 py-2 text-left border-b text-gray-dark">
              Total
            </th>
            <th className="px-4 py-2 text-left border-b text-gray-dark">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="transition hover:bg-gray-light">
              <td className="px-4 py-4 border-b">
                <div className="flex items-center">
                  <Image
                    src={item.thumbnail!}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-lg shadow-md"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{item.subtitle}</p>
                    <p className="text-sm text-gray-500">{item.title}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 border-b">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="p-2 border rounded hover:border-gray-500 focus:outline-none"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-4 border-b text-gray-dark">
                ${(item.unit_price / 100).toFixed(2)}
              </td>
              <td className="px-4 py-4 border-b text-gray-dark">
                ${(item.total / 100).toFixed(2)}
              </td>
              <td className="px-4 py-4 border-b">
                <Button
                  title=""
                  className="shadow-none cursor-pointer"
                  icon={
                    <Image alt="" src="/trash.svg" height={24} width={24} />
                  }
                  onClick={() => handleRemoveItem(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
