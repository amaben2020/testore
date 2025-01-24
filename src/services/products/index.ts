import { fetchAPI } from '../base';

// Fetch products for each collection
export const fetchProductsForCollection = async (collectionId: string) => {
  const searchParams = new URLSearchParams({
    'collection_id[]': collectionId,
  });

  const { products } = await fetchAPI(
    `/store/products?${searchParams.toString()}&limit=3&fields=*variants.calculated_price&region_id=reg_01JJ6XBW7EVM3N8RSQV8ZXT5XQ`
  );

  return products;
};
