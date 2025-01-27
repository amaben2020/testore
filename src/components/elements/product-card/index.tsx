'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../button';
import clsx from 'clsx';
import LocalizedClientLink from '../localized-link';
import { addToCart } from '@/lib/data/cart';
import { useParams } from 'next/navigation';
import { useWishlist } from 'providers/WishlistProvider';

type TProductCard = {
  id: string;
  title: string;
  image: string;
  price: number;
  variantId: string;
};

const BASE_PRODUCT_QUANTITY = 1;

const ProductCard = ({ id, title, image, price, variantId }: TProductCard) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { countryCode } = useParams();

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const clickSound = new Audio('/click.wav');
    clickSound.play();

    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, title, image, price });
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdded || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await addToCart({
        variantId,
        quantity: BASE_PRODUCT_QUANTITY,
        countryCode:
          String(countryCode) ?? process.env.NEXT_PUBLIC_DEFAULT_REGION!,
      });
      // real time sync with cart dropdown
      window.dispatchEvent(new Event('cartUpdated'));
      setIsAdded(true);
    } catch (err) {
      setError(err.message);
      console.error('Error adding to cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LocalizedClientLink
      href={`/product/${id}`}
      className="relative xs:max-w-[160px] md:max-w-[320px] xl:max-w-[525px] hover:cursor-pointer flex flex-col justify-between rounded-lg"
      key={id}
    >
      {/* Add to Cart Button */}
      <Button
        className={clsx(
          isAdded && 'bg-black text-white',
          'absolute !text-black top-2 sm:top-5 left-2 sm:left-5'
        )}
        title={
          isAdded ? 'Added to cart' : isLoading ? 'Adding...' : 'Add to cart'
        }
        icon={<Image src="/cart.svg" alt="" width={16} height={16} />}
        iconPosition="left"
        shadowStrength="sm"
        variant="primary"
        size="sm"
        type="button"
        onClick={handleAddToCart}
        hasBorder
        disabled={isLoading || isAdded}
      />

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute p-1 bg-white rounded-full shadow-md top-2 right-2"
        title={''}
      >
        <Image
          src={isInWishlist(id) ? '/wishlist-red.svg' : '/wishlist.svg'}
          alt=""
          width={30}
          height={30}
        />
      </button>

      {error && (
        <p className="absolute text-xs text-red-500 top-12 left-2 sm:top-16 sm:left-5">
          {error}
        </p>
      )}

      <div className="flex items-center justify-center max-h-[170px] md:max-h-[572px] rounded-lg bg-gray-light hover:bg-gray-200">
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
        <p className="font-medium text-left text-black">${price.toFixed(2)}</p>
      </div>
    </LocalizedClientLink>
  );
};

export default ProductCard;
