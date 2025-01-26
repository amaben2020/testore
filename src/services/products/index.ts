import { HttpTypes } from '@medusajs/types';
import { fetchAPI } from '../base';
import { getRegion } from '@/lib/data/regions';

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

export const fetchProductsCollection = async (
  countryCode: string
): Promise<HttpTypes.StoreProduct[]> => {
  const region = await getRegion(countryCode);

  const { products } = await fetchAPI(
    `/store/products?collection_id=null&limit=3&fields=*variants.calculated_price&region_id=${region?.id}`
  );

  return products;
};

// http://localhost:9000/store/products?limit=3&offset=0&fields=*variants.calculated_price&region_id=reg_01JJ6XBW7EVM3N8RSQV8ZXT5XQ
