'use client';

import WishlistSummary from '@/components/molecules/wishlist/components/summary';
import WishlistTable from '@/components/molecules/wishlist/components/table';

const WishlistPage = () => {
  return (
    <section className="grid">
      <div className="container p-2 mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-gray-dark">Wishlist</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="col-span-8">
            <WishlistTable />
          </div>

          <div className="col-span-4">
            <WishlistSummary />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;
