import ProductCard from '@/components/elements/product-card';
import Image from 'next/image';
import React from 'react';

const ProductCardLayout = ({
  title,
  products,
}: {
  title: string;
  products: any[];
}) => {
  return (
    <section className="p-5 m-5 space-y-5 border-b xl:p-8 xl:m-8">
      <h3 className="text-sm text-black lg:text-2xl">{title}</h3>

      <div className="grid grid-cols-2 gap-10 border-gray-light lg:grid-cols-3">
        {products.map((_, index) => (
          <>
            <ProductCard key={index} />
          </>
        ))}
      </div>
    </section>
  );
};

export default ProductCardLayout;
