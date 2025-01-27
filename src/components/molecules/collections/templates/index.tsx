import { Suspense } from 'react';

import { HttpTypes } from '@medusajs/types';

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: any;
  collection: HttpTypes.StoreCollection;
  page?: string;
  countryCode: string;
}) {
  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || 'created_at';

  return (
    <div className="flex flex-col py-6 small:flex-row small:items-start content-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
        </div>
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
}
