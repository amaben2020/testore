'use client';

import ProductCardLayout from '@/components/layout/product-card-layout';
import { HttpTypes } from '@medusajs/types';
import { useState } from 'react';

const ProductSortFilterLayout = ({
  products,
  title,
}: {
  products: HttpTypes.StoreProduct[];
  title: string;
}) => {
  const [sortOption, setSortOption] = useState<'htl' | 'lth'>('htl');

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'htl') {
      return +new Date(b.created_at!) - +new Date(a.created_at!); // Newer first
    }
    if (sortOption === 'lth') {
      return +new Date(a.created_at!) - +new Date(b.created_at!); // Older first
    }
    return 0;
  });

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full p-4 border-b lg:w-1/4 lg:border-r lg:border-b-0">
        <h2 className="mb-4 text-lg font-semibold">Sort By</h2>
        <div className="space-y-2">
          <button
            className={`w-full text-left px-3 py-2 rounded-md ${
              sortOption === 'lth'
                ? 'bg-blue-100 text-blue-500 font-semibold'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setSortOption('lth')}
          >
            Created Date: High → Low
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded-md ${
              sortOption === 'htl'
                ? 'bg-blue-100 text-blue-500 font-semibold'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setSortOption('htl')}
          >
            Created Date: Low → High
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="w-full p-4">
        <ProductCardLayout hasBorder title={title} products={sortedProducts} />
      </div>
    </div>
  );
};

export default ProductSortFilterLayout;
