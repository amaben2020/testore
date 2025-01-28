import ProductCardLayout from '@/components/layout/product-card-layout';
import { HttpTypes } from '@medusajs/types';
import { fetchProducts, fetchProductsForCollection } from '@/services/products';
import Hero from '@/components/molecules/hero';
import { getRegion } from '@/services/regions';
import CTA from '@/components/molecules/cta';
import { listCollections } from '@/services/collections';

const Home = async ({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}) => {
  const { countryCode } = await params;

  const region = await getRegion(countryCode);

  const collections = await listCollections();

  const products = await fetchProducts('3', 0, region?.id);

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
    <section>
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

      <CTA />
    </section>
  );
};

export default Home;
