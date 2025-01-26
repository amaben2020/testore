'use client';

import Button from '@/components/elements/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Shipping({ cart }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!cart) {
      setError('Cart not found. Please try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create a payment collection
      const paymentCollectionResponse = await fetch(
        `http://localhost:9000/store/payment-collections`,
        {
          credentials: 'include',
          headers: {
            'x-publishable-api-key':
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'temp',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            cart_id: cart.id,
          }),
        }
      );

      const paymentCollectionData = await paymentCollectionResponse.json();

      if (!paymentCollectionResponse.ok) {
        throw new Error(
          paymentCollectionData.message || 'Failed to create payment collection'
        );
      }

      const paymentCollectionId = paymentCollectionData.payment_collection.id;

      // Step 2: Create a payment session
      const paymentSessionResponse = await fetch(
        `http://localhost:9000/store/payment-collections/${paymentCollectionId}/payment-sessions`,
        {
          credentials: 'include',
          headers: {
            'x-publishable-api-key':
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'temp',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ provider_id: 'pp_system_default' }),
        }
      );

      const paymentSessionData = await paymentSessionResponse.json();

      if (!paymentSessionResponse.ok) {
        throw new Error(
          paymentSessionData.message || 'Failed to create payment session'
        );
      }

      // Step 3: Complete the cart
      const completeResponse = await fetch(
        `http://localhost:9000/store/carts/${cart.id}/complete`,
        {
          credentials: 'include',
          headers: {
            'x-publishable-api-key':
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'temp',
          },
          method: 'POST',
        }
      );

      const completeData = await completeResponse.json();

      if (completeData.type === 'order' && completeData.order) {
        // Order was successfully created
        console.log('Order:', completeData.order);

        // Clear the cart manually
        await fetch(`http://localhost:9000/store/carts/${cart.id}`, {
          credentials: 'include',
          headers: {
            'x-publishable-api-key':
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'temp',
          },
          method: 'DELETE',
        });

        console.log('Cart cleared.');

        // Redirect to order success page
        router.push(`/order/${completeData.order.id}`);
      } else if (completeData.type === 'cart' && completeData.cart) {
        // An error occurred during completion
        throw new Error(completeData.message || 'Failed to complete cart');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      setError(
        error.message || 'An error occurred while processing your payment.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handlePayment}
        disabled={loading}
        title={loading ? 'Placing Order...' : 'Place Order'}
        className="block w-full py-2 mt-4 text-center text-white !bg-black rounded-lg cursor-pointer hover:bg-gray-dark"
      />
      {error && (
        <p className="mt-2 text-sm text-center text-red-500">{error}</p>
      )}
    </div>
  );
}
