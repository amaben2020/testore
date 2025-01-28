import { convertToLocale } from '@/lib/util/money';
import { fetchAPI } from '@/services/base';
import Image from 'next/image';

const Order = async ({ params }) => {
  const { id } = await params;

  console.log(id);

  const { order } = await fetchAPI(`/store/orders/${id}`);
  console.log(order);

  if (!order) {
    return <div className="py-8 text-center">Order not found.</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Order Summary */}
      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Order Summary</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-gray-600">Order ID:</p>
            <p className="font-semibold">{order.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            <p className="font-semibold capitalize">{order.status}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Amount:</p>
            <p className="font-semibold">
              {/* {convertToLocale({
                amount: order.total,
                currency_code: order.currency_code,
              })} */}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Date:</p>
            <p className="font-semibold">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center pb-4 border-b">
              <Image
                width={18}
                height={18}
                src={item.thumbnail}
                alt={item.title}
                className="object-cover w-16 h-16 mr-4 rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-600">{item.variant_title}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {convertToLocale({
                    amount: item.unit_price,
                    currency_code: order.currency_code,
                  })}
                </p>
                <p className="text-gray-600">
                  Total:{' '}
                  {convertToLocale({
                    amount: item.total,
                    currency_code: order.currency_code,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Information */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold">Payment Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-gray-600">Payment Status:</p>
            <p className="font-semibold capitalize">{order.payment_status}</p>
          </div>
          <div>
            <p className="text-gray-600">Payment Method:</p>
            <p className="font-semibold">Credit Card</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
