import { HttpTypes } from '@medusajs/types';
import { fetchAPI } from '../base';

// Fetch products for each collection
export const fetchProductsForCollection = async (
  collectionId: string,
  regionId: string
) => {
  const searchParams = new URLSearchParams({
    'collection_id[]': collectionId,
  });

  const { products } = await fetchAPI(
    `/store/products?${searchParams.toString()}&limit=3&fields=*variants.calculated_price&region_id=${regionId}`
  );

  return products;
};

export const fetchSearchProducts = async (
  queryParams: string,
  regionId: string
) => {
  const url = `/store/products?q=${queryParams}&fields=*variants.calculated_price&region_id=${regionId}`;
  return fetchAPI(url);
};

export const fetchProduct = async (
  productId: string,
  regionId: string
): Promise<HttpTypes.StoreProduct> => {
  const url = `/store/products/${productId}?fields=*variants.calculated_price&region_id=${regionId}`;
  const response = await fetchAPI(url);

  return response.product;
};

export const fetchProducts = async (): Promise<HttpTypes.StoreProduct[]> => {
  const url = `/store/products?fields=*variants.calculated_price`;
  const response = await fetchAPI(url);

  return response.products;
};
