import Image from 'next/image';
import { retrieveCart } from '@/lib/data/cart';
import Button from '@/components/elements/button';

const CartPage = async () => {
  const cart = await retrieveCart();

  return (
    <section className="grid">
      <div className="container p-4 mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-gray-dark">Cart</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cart Table */}
          <div className="col-span-8">
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
                  {cart?.items.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-gray-light"
                    >
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
                            <p className="text-sm text-gray-500">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 border-b">
                        <select
                          value={item.quantity}
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
                          className="shadow-none cursor-pointer "
                          icon={
                            <Image
                              alt=""
                              src="/trash.svg"
                              height={24}
                              width={24}
                            />
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-span-4">
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
              <button className="w-full py-3 mt-6 text-white transition bg-black rounded-lg hover:bg-gray-dark">
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
