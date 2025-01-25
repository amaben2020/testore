// import CategoryTemplate from '@/components/organisms/categories/templates';
// import { SortOptions } from '@/components/molecules/store/components/refinement-list/sort-products';
import { getCategoryByHandle, listCategories } from '@/lib/data/categories';
import { listRegions } from '@/lib/data/regions';
import { HttpTypes } from '@medusajs/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>;
  searchParams: Promise<{
    sortBy?: any;
    page?: string;
  }>;
};

export async function generateStaticParams() {
  const product_categories = await listCategories();

  if (!product_categories) {
    return [];
  }

  const countryCodes = await listRegions().then(
    (regions: HttpTypes.StoreRegion[]) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  );

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  );

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat();

  return staticParams;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  try {
    console.log('params.category', params.category);
    const productCategory = await getCategoryByHandle(params.category);

    const title = productCategory.name + ' | Medusa Store';

    const description = productCategory.description ?? `${title} category.`;

    return {
      title: `${title} | Medusa Store`,
      description,
      alternates: {
        canonical: `${params.category.join('/')}`,
      },
    };
  } catch (error) {
    notFound();
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sortBy, page } = searchParams;

  const productCategory = await getCategoryByHandle(params.category);

  console.log(productCategory);

  if (!productCategory) {
    notFound();
  }

  return (
    // <CategoryTemplate
    //   category={productCategory}
    //   sortBy={sortBy}
    //   page={page}
    //   countryCode={params.countryCode}
    // />
    <div>{JSON.stringify(productCategory)}</div>
  );
}
