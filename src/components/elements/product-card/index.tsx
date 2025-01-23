import Image from 'next/image';
import React from 'react';

const ProductCard = () => {
  return (
    <div
      // key={index}
      className="relative xs:w-[160px] sm:w-[320px] xl:w-[525px] hover:cursor-pointer"
    >
      {/* Add to Cart Button */}
      <button className="absolute px-3 py-1 text-white bg-black border top-5 left-5">
        Add to Cart
      </button>

      {/* Image */}
      <div className="flex items-center justify-center rounded-lg bg-gray-light">
        <Image src="/bag.png" alt="Product Image" width={363} height={493} />
      </div>
      {/* Text & Price */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs sm:text-sm">
          Technical backpack with invisible seams
        </p>
        <p className="font-medium text-left text-black">$300</p>
      </div>
    </div>
  );
};

export default ProductCard;
