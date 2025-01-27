import { HttpTypes } from '@medusajs/types';
import { fetchAPI } from '../base';

export const getCart = async (
  cartId: string
): Promise<HttpTypes.StoreCartResponse> => {
  const url = `/store/carts/${cartId}`;
  const response = await fetchAPI(url);

  return response.cart;
};

export const updateCart = async (
  cartId: string,
  payload: any
): Promise<HttpTypes.StoreCartResponse> => {
  const url = `/store/carts/${cartId}`;
  const response = await fetchAPI(url, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.cart;
};

export const completeCart = async (
  cartId: string
): Promise<HttpTypes.StoreCart> => {
  const url = `/store/carts/${cartId}/complete`;
  const response = await fetchAPI(url, {
    method: 'POST',
  });

  return response.cart;
};

export const setCartCustomer = async (
  cartId: string,
  customerId: string
): Promise<HttpTypes.StoreCart> => {
  const url = `/store/carts/${cartId}/customer`;
  const response = await fetchAPI(url, {
    method: 'POST',
    body: JSON.stringify({ customer_id: customerId }),
  });

  return response.cart;
};

export const addLineItem = async (
  cartId: string,
  payload: HttpTypes.StoreAddCartLineItem
): Promise<HttpTypes.StoreCartResponse> => {
  const url = `/store/carts/${cartId}/line-items`;
  const response = await fetchAPI(url, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.cart;
};

export const removeLineItem = async (
  cartId: string,
  lineItemId: string
): Promise<HttpTypes.StoreCart> => {
  const url = `/store/carts/${cartId}/line-items/${lineItemId}`;
  const response = await fetchAPI(url, {
    method: 'DELETE',
  });

  return response.cart;
};
