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
