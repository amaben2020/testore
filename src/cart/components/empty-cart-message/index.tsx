import InteractiveLink from '@/components/elements/interactive-link';
import { Heading, Text } from '@medusajs/ui';

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-2 py-48"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="flex flex-row items-baseline text-3xl-regular gap-x-2"
      >
        Cart
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        You don&apos;t have anything in your cart. Let&apos;s change that, use
        the link below to start browsing our products.
      </Text>
      <div>
        <InteractiveLink href="/">Explore products</InteractiveLink>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
