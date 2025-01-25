import { fetchProduct, fetchProducts } from '@/services/products';

import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import AddToCart from './components/add-to-cart-form';

export async function generateStaticParams() {
  const products = await fetchProducts();

  return products.map(({ id }) => ({
    id: id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id, '');

  if (!product) {
    notFound();
  }

  const metadata = {
    title: `${product.title} | Testores Store`,
    description: `${product.title} collection`,
  } as Metadata;

  return metadata;
}

const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const product = await fetchProduct(id, '');

  return (
    <div className="flex flex-col items-center max-w-6xl gap-4 p-6 mx-auto my-5 bg-gray-100 rounded-lg shadow-md lg:flex-row">
      {/* Description Section */}
      <div className="w-full lg:w-1/5">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center w-full lg:w-3/5">
        <Image
          height={400}
          width={400}
          src={String(product.thumbnail)}
          alt={product.title}
          quality={100}
        />
      </div>

      {/* Action Section */}
      <div className="flex flex-col items-center w-full lg:w-1/5">
        <p className="mb-3">
          Price: ${product.variants[0].calculated_price.calculated_amount}{' '}
        </p>

        {/*  server action */}
        <AddToCart productId={id} variantId={product.variants[0].id} />
      </div>
    </div>
  );
};

export default Product;
