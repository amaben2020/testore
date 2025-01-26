import { convertToLocale } from '@/lib/util/money';
import { HttpTypes } from '@medusajs/types';

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder;
};

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return;
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    });
  };

  return (
    <div>
      <h2 className="text-base-semi">Order Summary</h2>
      <div className="my-2 text-small-regular text-ui-fg-base">
        <div className="flex items-center justify-between mb-2 text-base-regular text-ui-fg-base">
          <span>Subtotal</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(order.discount_total)}</span>
            </div>
          )}
          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(order.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Taxes</span>
            <span>{getAmount(order.tax_total)}</span>
          </div>
        </div>
        <div className="w-full h-px my-4 border-b border-gray-200 border-dashed" />
        <div className="flex items-center justify-between mb-2 text-base-regular text-ui-fg-base">
          <span>Total</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
