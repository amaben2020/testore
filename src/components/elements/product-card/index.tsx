'use client';
import Image from 'next/image';
import React from 'react';
import Button from '../button';
import clsx from 'clsx';

type TProductCard = {
  id: number;
  title: string;
  image: string;
  price: number;
};

const ProductCard = ({ id, title, image, price }: TProductCard) => {
  // create a currency map for us/ gb etc based on params countryCode

  const isAdded = false;
  return (
    <div
      className="relative xs:max-w-[160px] md:max-w-[320px]  xl:max-w-[525px] hover:cursor-pointer flex flex-col justify-between rounded-lg"
      key={id}
    >
      {/* Add to Cart Button */}

      <Button
        className={clsx(
          isAdded && 'bg-black',
          'absolute !text-black top-2 sm:top-5 left-2 sm:left-5'
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
      <div className="flex items-center justify-center max-h-[170px] md:max-h-[572px]  rounded-lg bg-gray-light hover:bg-gray-200">
        <Image
          src={image}
          alt={title}
          width={363}
          height={493}
          className="w-[160px] h-[170px] md:w-[363px] md:h-[493px] object-contain"
          quality={100}
          onError={(e) => {
            e.currentTarget.src = '/bag.svg';
          }}
        />
      </div>
      {/* Text & Price */}
      <div className="flex items-center justify-between pt-4 mt-auto">
        <p className="text-xs sm:text-sm">{title}</p>
        <p className="font-medium text-left text-black"> ${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
