import { useWishlist } from 'providers/WishlistProvider';
import EmptyWishlistMessage from '../empty';

const WishlistSummary = () => {
  const { wishlist } = useWishlist();

  if (!wishlist.length) {
    return (
      <div className="py-10">
        <EmptyWishlistMessage />;
      </div>
    );
  }
  const totalPrice = wishlist.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-gray-light">
      <h2 className="mb-4 text-xl font-bold text-gray-dark">Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default WishlistSummary;
