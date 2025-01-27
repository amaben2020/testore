import LocalizedClientLink from '@/components/elements/localized-link';
import CTA from '@/components/molecules/cta';
import Image from 'next/image';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalizedClientLink href="/" className="text-white rounded-lg">
        <Image
          alt=""
          src="/testore.svg"
          width={200}
          height={200}
          className="px-5 py-3 mt-4 lg:py-6 lg:px-10"
        />
      </LocalizedClientLink>
      <section>
        {children}
        <CTA />
      </section>
    </>
  );
}
