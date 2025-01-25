'use client';

import { FormEvent, useState } from 'react';
import { addToCart } from '@/lib/data/cart';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/elements/button';

export default function AddToCart({
  productId,
  variantId,
}: {
  productId: string;
  variantId: string;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const pathname = usePathname();

  const countryCode = pathname.split('/')[1];

  const handleAddToCart = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!variantId) return null;

    setIsAdding(true);

    await addToCart({
      variantId,
      quantity: 1,
      countryCode,
    });

    setIsAdding(false);
  };

  return (
    <form key={JSON.stringify({ variantId })} onSubmit={handleAddToCart}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value="1" />
      <input type="hidden" name="variantId" value={variantId} />

      <Button
        type="submit"
        className="bg-primary"
        title={isAdding ? 'Adding to cart...' : 'Add to cart'}
        icon={<Image src="/cart.svg" alt="" width={16} height={16} />}
        iconPosition="left"
        shadowStrength="sm"
        variant="primary"
        size="sm"
        disabled={isAdding}
        hasBorder
      />
    </form>
  );
}
