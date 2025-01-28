import React from 'react';

import { fetchSearchProducts } from '@/services/products';
import CollectionWithPagination from '@/components/organisms/product-category';

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
      <CollectionWithPagination
        products={products.products}
        title={`Search Result${
          products.products.length > 1 ? 's' : ''
        } for ${q}`}
      />
    </div>
  );
};

export default SearchPage;
