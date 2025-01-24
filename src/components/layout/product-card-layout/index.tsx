import ProductCard from '@/components/elements/product-card';
import { HttpTypes } from '@medusajs/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCardLayout = ({
  title,
  products,
  hasBorder,
}: {
  title: string;
  products: HttpTypes.StoreProduct[];
  hasBorder?: boolean;
}) => {
  return (
    <section className="p-3 m-3 space-y-5 xl:p-6 xl:m-6 ">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-black capitalize lg:text-2xl">{title}</h3>
        <Link href="/products">
          <span className="flex items-center gap-2">
            <p className="text-[#0073E6] text-lg">See all</p>
            <Image alt="" src="/blue-arrow.svg" width={24} height={24} />
          </span>
        </Link>
      </div>

      <div
        className={clsx(
          hasBorder && 'border-b-0 lg:border-b',
          'grid grid-cols-2 gap-6 xl:gap-10 lg:grid-cols-3 xl:pb-12'
        )}
      >
        {Array.isArray(products) &&
          products.map((product) => (
            <>
              <ProductCard
                title={product?.title}
                image={product?.thumbnail}
                id={product?.id}
                price={
                  product?.variants[0]?.calculated_price?.calculated_amount
                }
                key={product?.id}
              />
            </>
          ))}
      </div>
    </section>
  );
};

export default ProductCardLayout;
