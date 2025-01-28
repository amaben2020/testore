import CollectionWithPagination from '@/components/organisms/product-category';
import { getCollectionByHandle } from '@/services/collections';
import { fetchProductsCollection } from '@/services/products';
import { HttpTypes } from '@medusajs/types';

import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ handle: string; countryCode: string }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
  }>;
};

export default async function CollectionPage(props: Props) {
  const params = await props.params;

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: HttpTypes.StoreCollection) => collection
  );

  if (!collection) {
    notFound();
  }

  const products = await fetchProductsCollection(params.countryCode ?? 'us');

  return (
    <div>
      <CollectionWithPagination
        products={products}
        title="Products"
        collection={collection}
      />
    </div>
  );
}
