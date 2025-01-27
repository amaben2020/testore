import CollectionWithPagination from '@/components/organisms/product-category';
import { getCollectionByHandle, listCollections } from '@/lib/data/collections';
import { getRegion, listRegions } from '@/lib/data/regions';
import { HttpTypes } from '@medusajs/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProducts } from '@/services/products';

type Props = {
  params: Promise<{ handle: string; countryCode: string }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

// export async function generateMetadata(props: Props): Promise<Metadata> {
//   const params = await props.params;
//   const collection = await getCollectionByHandle(params.handle);

//   if (!collection) {
//     notFound();
//   }

//   const metadata = {
//     title: `${collection.title} | Testores Store`,
//     description: `${collection.title} collection`,
//   } as Metadata;

//   return metadata;
// }

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const offset = parseInt(searchParams.page || '1', 10);
  const pageLimit = parseInt(searchParams.limit || '3', 10);

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: HttpTypes.StoreCollection) => collection
  );

  if (!collection) {
    notFound();
  }

  const products = await fetchProducts();

  return (
    <div>
      <CollectionWithPagination
        products={products}
        title={collection.title}
        limit={pageLimit}
        initialPage={offset}
      />
    </div>
  );
}
