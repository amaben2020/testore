'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import ProductCardLayout from '@/components/layout/product-card-layout';
import { HttpTypes } from '@medusajs/types';

type Props = {
  collection: HttpTypes.StoreCollection;
  products: HttpTypes.StoreProduct[];
  title: string;
  initialSortBy?: string;
  initialPage?: number;
};

const PRODUCT_LIMIT = 12;

export default function CollectionWithPagination({
  collection,
  products,
  title,
  initialSortBy = 'created_at',
  initialPage = 1,
}: Props) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [itemsPerPage, setItemsPerPage] = useState(PRODUCT_LIMIT);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const query = createQueryString('page', newPage.toString());
    router.push(`${pathname}?${query}`);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const query = createQueryString('sortBy', newSort);
    router.push(`${pathname}?${query}`);
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page
    const query = createQueryString('limit', newLimit.toString());
    router.push(`${pathname}?${query}`);
  };

  const maxPage = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products
    .sort((a, b) => {
      if (sortBy === 'price_low') {
        return a.variants[0].calculated_price - b.variants[0].calculated_price;
      }
      if (sortBy === 'price_high') {
        return b.variants[0].calculated_price - a.variants[0].calculated_price;
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col items-center py-6 content-container">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <div className="flex justify-between w-full mb-4">
        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="created_at">Newest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>

        {/* Items Per Page Dropdown */}
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
          className="border rounded px-4 py-2"
        >
          <option value={12}>12 per page</option>
          <option value={24}>24 per page</option>
          <option value={48}>48 per page</option>
        </select>
      </div>

      <ProductCardLayout
        products={paginatedProducts}
        title={collection.title}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {maxPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maxPage}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
