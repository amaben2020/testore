'use client';
import Image from 'next/image';
import React from 'react';
import Button from '../button';
import clsx from 'clsx';

const ProductCard = ({ id, title, image, price }) => {
  console.log(price);
  const isAdded = false;
  return (
    <div className="relative xs:w-[160px] sm:w-[320px] xl:w-[525px] hover:cursor-pointer">
      {/* Add to Cart Button */}

      <Button
        className={clsx(
          isAdded && 'bg-black',
          'absolute !text-black top-5 left-5'
        )}
        title={isAdded ? 'Added to cart' : 'Add to cart'}
        icon={<Image src="/cart.svg" alt="" width={16} height={16} />}
        iconPosition="left"
        shadowStrength="sm"
        variant="primary"
        size="sm"
        onClick={() => console.log('Button clicked!')}
        hasBorder
      />

      {/* Image */}
      <div className="flex items-center justify-center rounded-lg bg-gray-light">
        <Image src="/bag.png" alt="Product Image" width={363} height={493} />
      </div>
      {/* Text & Price */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs sm:text-sm">{title}</p>
        <p className="font-medium text-left text-black">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
