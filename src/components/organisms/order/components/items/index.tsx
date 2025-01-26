import { HttpTypes } from '@medusajs/types';
import { Table } from '@medusajs/ui';
import Item from '../item';
import repeat from '@/lib/util/repeat';

type ItemsProps = {
  order: HttpTypes.StoreOrder;
};

const Items = ({ order }: ItemsProps) => {
  const items = order.items;

  return (
    <div className="flex flex-col">
      <br className="!mb-0" />
      <Table>
        <Table.Body data-testid="products-table">
          {items?.length
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? '') > (b.created_at ?? '') ? -1 : 1;
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={order.currency_code}
                    />
                  );
                })
            : repeat(5).map((i) => {
                return <div key={i} />;
              })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Items;
