import React from 'react';

import ProductSortFilterLayout from '@/components/molecules/sort-filter';
import { fetchSearchProducts } from '@/services/products';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  const { q } = await searchParams;

  const products = await fetchSearchProducts(String(q), '');

  if (!products) {
    return <p>Nothing found</p>;
  }

  return (
    <div>
      <ProductSortFilterLayout
        products={products.products}
        title={`Search Result${
          products.products.length > 1 ? 's' : ''
        } for ${q}`}
      />
    </div>
  );
};

export default SearchPage;
