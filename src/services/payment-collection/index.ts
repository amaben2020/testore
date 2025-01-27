import { fetchAPI } from '../base';

/**
 * Creates a payment collection.
 * @param cartId - The ID of the cart.
 * @returns The payment collection ID.
 */
export const createPaymentCollection = async (
  cartId: string
): Promise<string> => {
  const data = await fetchAPI('/store/payment-collections', {
    method: 'POST',
    body: { cart_id: cartId },
  });

  if (!data?.payment_collection || !payment_collection.id) {
    throw new Error('Failed to create payment collection');
  }

  return data?.payment_collection.id;
};

/**
 * Creates a payment session for a given payment collection.
 * @param paymentCollectionId - The ID of the payment collection.
 * @param providerId - The payment provider ID (default: 'pp_system_default').
 */
export const createPaymentSession = async (
  paymentCollectionId: string,
  providerId = 'pp_system_default'
): Promise<void> => {
  const response = await fetchAPI(
    `/store/payment-collections/${paymentCollectionId}/payment-sessions`,
    {
      method: 'POST',
      body: { provider_id: providerId },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create payment session');
  }
};

/**
 * Completes the cart and clears it if successful.
 * @param cartId - The ID of the cart.
 * @returns The order data.
 */
export const completeCart = async (cartId: string): Promise<any> => {
  const { type, order } = await fetchAPI(`/store/carts/${cartId}/complete`, {
    method: 'POST',
  });

  if (type !== 'order' || !order) {
    throw new Error('Failed to complete the cart');
  }

  // Clear the cart
  await fetchAPI(`/store/carts/${cartId}`, { method: 'DELETE' });

  return order;
};
