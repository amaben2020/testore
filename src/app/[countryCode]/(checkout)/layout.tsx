import CTA from '@/components/molecules/cta';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full bg-white small:min-h-screen">
      {children}

      <CTA />
    </div>
  );
}
