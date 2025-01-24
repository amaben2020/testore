import LocalizedClientLink from '@/components/elements/localized-link';
import { listCategories } from '@/lib/data/categories';
import { listCollections } from '@/lib/data/collections';
import { clx } from '@medusajs/ui';
import Image from 'next/image';
import AccordionComponent, { TAccordionProps } from '../accordion';
import FooterLinks from '@/components/elements/footer-links';
import { legals, socials } from '@/components/elements/footer-links/data/data';

export default async function Footer() {
  const { collections } = await listCollections({
    fields: '*products',
  });
  const productCategories = await listCategories();

  return (
    <footer className="w-full px-6 py-1 lg:px-12 lg:py-20 bg-gray-light">
      {/* Step 1: Logo and Category Links */}
      <div className="py-1 border-t-0 border-b lg:border-t lg:py-20 md:flex md:justify-between border-ui-border-base">
        <div className="mb-3 lg:mb-8 md:mb-0">
          <LocalizedClientLink href="/">
            <Image
              src="/testore.svg"
              alt=""
              className="w-[90px] h-[26px] md:block hidden"
              width={90}
              height={26}
            />
          </LocalizedClientLink>
        </div>

        <div className="hidden gap-16 sm:grid-cols-2 lg:grid-cols-4 sm:grid">
          {productCategories && productCategories.length > 0 && (
            <div>
              <h4 className="text-sm cursor-pointer md:cursor-default text-[#878787]">
                Categories
              </h4>
              <ul
                className={clx(
                  'mt-4 space-y-5',

                  'sm:block'
                )}
              >
                {productCategories.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      href={`/categories/${c.handle}`}
                      className="text-sm text-black capitalize"
                    >
                      {c.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {collections && collections.length > 0 && (
            <div>
              <h4 className="text-sm   text-[#878787]">Collections</h4>
              <ul className="mt-4 space-y-5">
                {collections.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      href={`/collections/${c.handle}`}
                      className="text-sm text-black capitalize"
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <FooterLinks title="Legals" data={legals} />

          <FooterLinks title="Socials" data={socials} />
        </div>

        <AccordionComponent data={productCategories} header="Products" />
        <AccordionComponent
          data={
            collections.map((item) => ({
              ...item,
              name: item.title,
            })) as never as TAccordionProps
          }
          header="Categories"
        />
        <AccordionComponent
          data={legals as never as TAccordionProps}
          header="Legal"
        />
        <AccordionComponent
          data={socials as never as TAccordionProps}
          header="Social"
        />
      </div>

      {/* Step 2: Footer Bottom */}
      <div className="w-full py-10 lg:py-20">
        <div className="flex flex-col-reverse items-start justify-between gap-4 md:items-center content-container md:flex-row">
          <p className="text-xs lg:text-base text-[#1A202C]">
            © {new Date().getFullYear()} Trade Enablers. All rights reserved.
          </p>
          <div className="flex space-x-6 text-ui-fg-muted">
            <LocalizedClientLink href="/">
              <Image src="/github.svg" alt="" width={24} height={24} />
            </LocalizedClientLink>
            <LocalizedClientLink href="/">
              <Image src="/x.svg" alt="" width={24} height={24} />
            </LocalizedClientLink>{' '}
            <LocalizedClientLink href="/">
              <Image src="/facebook.svg" alt="" width={24} height={24} />
            </LocalizedClientLink>{' '}
            <LocalizedClientLink href="/">
              <Image src="/instagram.svg" alt="" width={24} height={24} />
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
