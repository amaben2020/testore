import React from 'react';

import Image from 'next/image';
import LocalizedClientLink from '@/components/elements/localized-link';
import { useWishlist } from 'providers/WishlistProvider';

const WishlistDropdown = ({ onClose }: { onClose: () => void }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="absolute right-0 z-50 mt-2 bg-white shadow-lg border-gray-light w-80">
      <div className="p-6 border rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">Wishlist</h3>
        {wishlist.length > 0 ? (
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                />
                <div className="flex-1">
                  <p className="text-sm">{item.title}</p>
                  <p className="text-xs text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <div>
              <LocalizedClientLink
                onClick={onClose}
                href="/wishlist"
                className="w-full border p-2  text-sm font-bold text-gray-light transition rounded-lg cursor-pointer !bg-black hover:!bg-gray-dark hover:text-white"
              >
                Go to wishlists
              </LocalizedClientLink>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistDropdown;
