import { Github } from '@medusajs/icons';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="min-h-[300px] xl:min-h-[675px] w-full bg-gray-light flex flex-col items-center relative ">
      <div className="max-w-[865px] flex flex-col items-center gap-4 text-center mt-10 xl:mt-32">
        <h1 className="text-black">
          Launch Your E-Commerce Platform with Trade Enablers and Next.js
        </h1>
        <h2 className="text-xs xl:text-base text-gray-dark">
          Easily start your online store using our ready-made template and
          tools.
        </h2>
        <Link
          href="https://github.com/medusajs/nextjs-starter-medusa"
          target="_blank"
          className="flex items-center gap-2 px-5 py-3.5 text-base border rounded-lg shadow-lg"
        >
          <p className="text-base text-black">View on GitHub</p>
          <Github className="ml-2" />
        </Link>
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
