import axios from 'axios';

export const createPaymentCollectionResponse = async (cartItem: {
  cart_id: string;
}) => {
  try {
    const data = await axios.post(
      `${process.env.MEDUSA_BACKEND_URL!}/store/payment-collections`,
      cartItem,
      {
        headers: {
          'x-publishable-api-key':
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? '',
        },
      }
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPaymentCollectionSession = async (collectionId: string) => {
  try {
    await axios.post(
      `${process.env
        .MEDUSA_BACKEND_URL!}/store/payment-collections/${collectionId}/payment-sessions`,
      { provider_id: 'pp_system_default' },
      {
        headers: {
          'x-publishable-api-key':
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'temp',
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const completeCart = async (cartId: string) => {
  try {
    const data = await axios.post(
      `${process.env.MEDUSA_BACKEND_URL!}/store/carts/${cartId}/complete`,
      {},
      {
        headers: {
          'x-publishable-api-key':
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
        },
      }
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
