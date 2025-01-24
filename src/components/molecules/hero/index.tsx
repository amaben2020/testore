import Button from '@/components/elements/button';
import { Github } from '@medusajs/icons';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="min-h-[300px] xl:min-h-[675px] w-full bg-gray-light flex flex-col items-center relative p-5">
      <div className="max-w-[865px] flex flex-col items-center gap-4 text-center mt-10 xl:mt-32">
        <h1 className="text-black">
          Launch Your E-Commerce Platform with Trade Enablers and Next.js
        </h1>
        <h2 className="text-xs xl:text-base text-gray-dark">
          Easily start your online store using our ready-made template and
          tools.
        </h2>

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
      <div className="absolute bottom-0 flex justify-center w-full">
        <Image
          src="/rocket.svg"
          alt="Rocket Illustration"
          height={559}
          width={582}
          className="w-[200px] xl:w-[559px] h-auto max-w-full"
        />
      </div>
    </div>
  );
};

export default Hero;
