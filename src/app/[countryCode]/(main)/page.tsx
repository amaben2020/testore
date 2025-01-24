import { fetchAPI } from '@/services/base';

import ProductCardLayout from '@/components/layout/product-card-layout';
import { HttpTypes } from '@medusajs/types';
import { fetchProductsForCollection } from '@/services/products';
import Hero from '@/components/molecules/hero';
import { getRegion } from '@/lib/data/regions';

const Home = async ({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}) => {
  const { countryCode } = await params;

  const region = await getRegion(countryCode);

  // Fetch collections from the API
  const collections = await fetchAPI('/store/collections');

  const { products } = await fetchAPI(
    `/store/products?collection_id=null&limit=3&fields=*variants.calculated_price&region_id=${region?.id}`
  );

  // Fetch products for each collection
  const [latestDrops, recommended] = await Promise.all(
    collections?.collections?.map(
      async (collection: HttpTypes.StoreCollection) => {
        const products = await fetchProductsForCollection(
          collection.id,
          region?.id ? region.id : ''
        );
        return { ...collection, products };
      }
    )
  );

  return (
    <section className="border-b-0 lg:border-b">
      <Hero />

      <ProductCardLayout
        hasBorder
        title={recommended.title}
        products={recommended.products}
      />
      <ProductCardLayout
        hasBorder
        title={latestDrops.title}
        products={latestDrops.products}
      />
      <ProductCardLayout title="TE STORE" products={products} />
    </section>
  );
};

export default Home;
