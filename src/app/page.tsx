import { fetchAPI } from '@/services/base';
import Hero from '../components/molecules/hero';
import ProductCardLayout from '@/components/layout/product-card-layout';
import { HttpTypes } from '@medusajs/types';
import { fetchProductsForCollection } from '@/services/products';

const Home = async () => {
  // Fetch collections from the API
  const collections = await fetchAPI('/store/collections');

  const { products } = await fetchAPI(
    '/store/products?collection_id=null&limit=3&fields=*variants.calculated_price&region_id=reg_01JJ6XBW7EVM3N8RSQV8ZXT5XQ'
  );

  // Fetch products for each collection
  const [latestDrops, recommended] = await Promise.all(
    collections?.collections?.map(
      async (collection: HttpTypes.StoreCollection) => {
        const products = await fetchProductsForCollection(collection.id);
        return { ...collection, products };
      }
    )
  );

  console.log('latestDrops', latestDrops);
  console.log('recommended', recommended);

  console.log('productsNotInCollection', products);

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
      <ProductCardLayout title="TE STORE" products={[...Array(3)]} />
    </section>
  );
};

export default Home;
