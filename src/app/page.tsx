import Hero from '../components/molecules/hero';
import ProductCardLayout from '@/components/layout/product-card-layout';

const Home = async () => {
  return (
    <section>
      <Hero />

      <ProductCardLayout title="Recommended Picks" products={[...Array(6)]} />
    </section>
  );
};

export default Home;
