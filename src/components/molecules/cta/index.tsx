import { Github } from '@medusajs/icons';
import Button from '@/components/elements/button';
import LocalizedClientLink from '@/components/elements/localized-link';
import Image from 'next/image';

const CTA = () => {
  return (
    <section className="p-6 py-5 border-t-0 lg:py-20 gap-y-20 xl:px-12 bg-gray-light lg:border-t">
      <LocalizedClientLink href="/">
        <Image
          src="/testore.svg"
          alt=""
          className="w-[90px] h-[26px] md:hidden block mb-3"
          width={90}
          height={26}
        />
      </LocalizedClientLink>
      <div className="w-10/12 space-y-10 md:w-1/2">
        <h2>Launch Your E-Commerce today with our ready made template.</h2>

        <Button
          className="w-[200px] !text-black font-normal"
          title="View on GitHub"
          icon={<Github />}
          iconPosition="right"
          shadowStrength="lg"
          variant="primary"
          size="md"
          href="https://github.com/medusajs/nextjs-starter-medusa"
          hasBorder
        />
      </div>
    </section>
  );
};

export default CTA;
