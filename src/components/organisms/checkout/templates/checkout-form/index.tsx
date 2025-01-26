import { listCartPaymentMethods } from '@/lib/data/payment';
import { HttpTypes } from '@medusajs/types';
import Shipping from '../../components/shipping';

export default async function CheckoutForm({
  cart,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) {
  if (!cart) {
    return null;
  }

  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? '');

  if (!paymentMethods) {
    return null;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-y-8">
      <Shipping cart={cart} />
    </div>
  );
}
