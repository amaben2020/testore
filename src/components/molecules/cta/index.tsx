import { Github } from '@medusajs/icons';
import Button from '@/components/elements/button';

const CTA = () => {
  return (
    <section className="p-6 py-20 gap-y-20 xl:px-12 bg-gray-light">
      <div className="w-1/2 space-y-10">
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
