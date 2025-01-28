'use client';

import { retrieveCustomer } from '@/services/customer';
import { HttpTypes } from '@medusajs/types';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';

export default function PaymentAndShipping({
  cart,
}: {
  cart: HttpTypes.StoreCart;
}) {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<
    HttpTypes.StoreCustomerResponse['customer'] | null
  >();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const handleGetCustomer = async () => {
      try {
        const customer = await retrieveCustomer();

        setCustomer(customer);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handleGetCustomer();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  const handleSuccess = async () => {
    const cartItem = {
      cart_id: cart?.id,
    };
    try {
      const paymentCollectionResponse = await axios.post(
        `http://localhost:9000/store/payment-collections`,
        cartItem,
        {
          headers: {
            'x-publishable-api-key':
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? '',
          },
        }
      );

      const { data: collectionResp } = paymentCollectionResponse;

      await axios.post(
        `http://localhost:9000/store/payment-collections/${collectionResp?.payment_collection.id}/payment-sessions`,
        { provider_id: 'pp_system_default' },
        {
          headers: {
            'x-publishable-api-key':
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'temp',
          },
        }
      );

      const { data: completeResponse } = await axios.post(
        `http://localhost:9000/store/carts/${cart.id}/complete`,
        {},
        {
          headers: {
            'x-publishable-api-key':
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
          },
        }
      );

      const completeData = await completeResponse;

      console.log('completeData ====>', completeData);

      if (completeData.type === 'order' && completeData.order) {
        router.push(`/order/${completeData.order.id}`);
      } else {
        throw new Error(completeData.message || 'Failed to complete cart');
      }
    } catch (error) {
      console.error('Error completing cart:', error);
      if (error instanceof Error)
        setError(
          error.message || 'An error occurred while completing your order.'
        );
    }
  };

  const CURRENT_DOLLAR_RATE = 1700;

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

  const amount =
    Number(cart?.total * CURRENT_DOLLAR_RATE * 100) > 1000000
      ? 100000
      : Number(cart?.total * CURRENT_DOLLAR_RATE * 100) || 0;
  const email = cart?.email ?? customer?.email ?? 'uzochukwubenamara@gmail.com'; // the last one shouldn't happen
  const currency =
    cart?.region?.currency_code?.toUpperCase() !== 'NGN'
      ? 'NGN'
      : cart?.region?.currency_code?.toUpperCase();
  const reference = `ref_${Date.now()}`;

  return (
    <div>
      <PaystackButton
        publicKey={publicKey}
        amount={amount}
        email={email}
        currency={currency}
        reference={reference}
        text="Pay with Paystack 🇳🇬"
        onSuccess={handleSuccess}
        onClose={() => console.log('Payment closed')}
        className="block w-full py-2 mt-4 text-center text-white bg-black rounded-lg hover:bg-gray-dark"
      />
      {error && (
        <p className="mt-2 text-sm text-center text-red-500">{error}</p>
      )}
    </div>
  );
}
