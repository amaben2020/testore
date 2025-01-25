import ProductCardLayout from '@/components/layout/product-card-layout';
import { getCategoryByHandle, listCategories } from '@/lib/data/categories';
import { listRegions } from '@/lib/data/regions';
import { fetchAPI } from '@/services/base';
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
    (category: HttpTypes.StoreProductCategory) => category.handle
  );

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle) => ({
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

  const [{ products: categoryProducts }, { products }] = await Promise.all([
    getCategoryByHandle(params.category),
    await fetchAPI(`/store/products?fields=*variants.calculated_price`),
  ]);

  if (!categoryProducts) {
    notFound();
  }

  const productsWithCalculatedPrice = categoryProducts.map((product) => {
    const categoryProduct = products.find(
      (catProduct: HttpTypes.StoreProduct) => catProduct.id === product.id
    );

    return categoryProduct;
  });

  return (
    <div>
      <ProductCardLayout
        products={productsWithCalculatedPrice}
        title={params.category[0]}
      />
    </div>
  );
}
