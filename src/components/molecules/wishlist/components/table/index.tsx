import { useWishlist } from 'providers/WishlistProvider';
import Image from 'next/image';
import LocalizedClientLink from '@/components/elements/localized-link';
import Button from '@/components/elements/button';
import EmptyWishlistMessage from '../empty';

const WishlistTable = () => {
  const { wishlist } = useWishlist();

  if (!wishlist.length) {
    return (
      <div className="py-10">
        <EmptyWishlistMessage />;
      </div>
    );
  }
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="text-sm font-bold uppercase text-gray-dark">
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="flex items-center gap-4 px-4 py-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg"
                  width={18}
                  height={18}
                />
                <span>{item.title}</span>
              </td>
              <td className="px-4 py-3">${item.price.toFixed(2)}</td>
              <td className="px-4 py-3">
                <LocalizedClientLink href={`/product/${item.id}`}>
                  <Button
                    title="View"
                    className="w-full text-xl font-semibold text-gray-light transition rounded-lg cursor-pointer !bg-black hover:!bg-gray-dark hover:text-white"
                    size="sm"
                    shadowStrength="md"
                  />
                </LocalizedClientLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishlistTable;
