import LocalizedClientLink from '@/components/elements/localized-link';
import ChevronDown from '@/components/icons/chevron-down';
import CTA from '@/components/molecules/cta';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full bg-white border small:min-h-screen">
      <div className="h-16 bg-white border-b ">
        <nav className="flex items-center justify-between h-full content-container">
          <LocalizedClientLink
            href="/cart"
            className="flex items-center flex-1 uppercase text-small-semi text-ui-fg-base gap-x-2 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" />
            <span className="hidden mt-px small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
              Back to shopping cart
            </span>
            <span className="block mt-px small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="uppercase txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base"
            data-testid="store-link"
          >
            TE Store
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="flex items-center justify-center w-full py-4">
        <CTA />
      </div>
    </div>
  );
}
