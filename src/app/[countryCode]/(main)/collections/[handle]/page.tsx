import CollectionWithPagination from '@/components/organisms/product-category';
import { getCollectionByHandle, listCollections } from '@/services/collections';
import { listRegions } from '@/services/regions';
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

export async function generateStaticParams() {
  const { collections } = await listCollections({
    fields: '*products',
  });

  if (!collections) {
    return [];
  }

  const countryCodes = await listRegions().then(
    (regions: HttpTypes.StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  );

  const collectionHandles = collections.map(
    (collection: HttpTypes.StoreCollection) => collection.handle
  );

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      collectionHandles.map((handle: string | undefined) => ({
        countryCode,
        handle,
      }))
    )
    .flat();

  return staticParams;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    notFound();
  }

  const metadata = {
    title: `${collection.title} | Testores Store`,
    description: `${collection.title} collection`,
  } as Metadata;

  return metadata;
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const offset = parseInt(searchParams.page || '1', 10);
  const pageLimit = parseInt(searchParams.limit || '3', 10);

  const products = await fetchProducts();

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: HttpTypes.StoreCollection) => collection
  );

  if (!collection) {
    notFound();
  }

  const productsWithPrice = products?.filter((item: HttpTypes.StoreProduct) =>
    item.collection?.handle.includes(params.handle)
  );

  return (
    <div>
      <CollectionWithPagination
        products={productsWithPrice}
        title={collection.title}
        limit={pageLimit}
        initialPage={offset}
      />
    </div>
  );
}
