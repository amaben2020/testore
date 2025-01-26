'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import ProductCardLayout from '@/components/layout/product-card-layout';
import { HttpTypes } from '@medusajs/types';

type Props = {
  products: HttpTypes.StoreProduct[];
  title: string;
  initialSortBy?: string;
  initialPage?: number;
  hideSeeAll?: boolean;
};

const PRODUCT_LIMIT = 3;

export default function CollectionWithPagination({
  products,
  title,
  initialSortBy = 'created_at',
  initialPage = 1,
  hideSeeAll = true,
}: Props) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [itemsPerPage, setItemsPerPage] = useState(PRODUCT_LIMIT);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create query string for URL updates
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const query = createQueryString('page', newPage.toString());
    router.push(`${pathname}?${query}`);
    scrollToTop(); // Smooth scroll to the top
  };

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const query = createQueryString('sortBy', newSort);
    router.push(`${pathname}?${query}`);
    scrollToTop(); // Smooth scroll to the top
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page
    const query = createQueryString('limit', newLimit.toString());
    router.push(`${pathname}?${query}`);
    scrollToTop(); // Smooth scroll to the top
  };

  // Smooth scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Calculate max page number
  const maxPage = Math.ceil(products.length / itemsPerPage);

  // Sort and paginate products
  const paginatedProducts = products
    .sort((a, b) => {
      const priceA = a.variants[0]?.calculated_price.calculated_amount || 0;
      const priceB = b.variants[0]?.calculated_price.calculated_amount || 0;

      if (sortBy === 'price_low') {
        return priceA - priceB;
      }
      if (sortBy === 'price_high') {
        return priceB - priceA;
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col items-center py-6 content-container">
      <h1 className="mb-6 text-2xl font-bold capitalize">{title}</h1>

      {/* Sort and Items Per Page Controls */}
      <div className="flex items-center gap-3 mb-4">
        {/* Sort Dropdown */}
        <p className="text-xl font-semibold text-gray-dark">Sort by: </p>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="created_at">Newest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>

        {/* Items Per Page Dropdown */}
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          <option value={3}>3 per page</option>
          <option value={6}>6 per page</option>
          <option value={9}>9 per page</option>
        </select>
      </div>

      {/* Product Card Layout */}
      <ProductCardLayout
        products={paginatedProducts}
        title=""
        hideSeeAll={hideSeeAll}
      />

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 mt-2">
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
