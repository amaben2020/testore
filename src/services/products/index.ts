import { HttpTypes } from '@medusajs/types';
import { fetchAPI } from '../base';
import { getRegion } from '@/lib/data/regions';

export const fetchProductsForCollection = async (
  collectionId: string,
  regionId: string,
  limit = 3
) => {
  const searchParams = new URLSearchParams({
    'collection_id[]': collectionId,
  });

  const { products } = await fetchAPI(
    `/store/products?${searchParams.toString()}&limit=${limit}&fields=*variants.calculated_price&region_id=${regionId}`
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

export const fetchProducts = async (
  limit?: string,
  offset = 0,
  regionId?: string
): Promise<HttpTypes.StoreProduct[]> => {
  const region = await getRegion('us');

  const url = limit
    ? `/store/products?fields=*variants.calculated_price&limit=${limit}&offset=${offset}&region_id=${
        regionId ?? region?.id
      }`
    : `/store/products?fields=*variants.calculated_price&region_id=${
        regionId ?? region?.id
      }`;
  const response = await fetchAPI(url);

  return response.products;
};

export const fetchProductsCollection = async (
  countryCode: string,
  limit = 3
): Promise<HttpTypes.StoreProduct[]> => {
  const region = await getRegion(countryCode);

  const { products } = await fetchAPI(
    `/store/products?collection_id=null&limit=${limit}&fields=*variants.calculated_price&region_id=${region?.id}`
  );

  return products;
};
