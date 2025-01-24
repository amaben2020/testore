'use client';
import LocalizedClientLink from '@/components/elements/localized-link';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import React from 'react';
import Image from 'next/image';

export type TAccordionProps = { handle: string; name: string; id: string }[];

const AccordionComponent = ({
  data,
  header,
  ...rest
}: {
  data: TAccordionProps;
  header: string;
}) => {
  return (
    <Accordion className="block w-full sm:hidden">
      <AccordionItem
        {...rest}
        header={({ state: { isEnter } }) => (
          <div className="flex items-center py-3">
            <span className="text-xs font-normal text-[#878787]">{header}</span>
            <Image
              className={`ml-auto transition-transform duration-200 ease-out ${
                isEnter && 'rotate-180'
              }`}
              src="chevron.svg"
              alt="Chevron"
              width={24}
              height={24}
            />
          </div>
        )}
        className="border-0"
        buttonProps={{
          className: 'w-full text-left text-sm text-black font-semibold',
        }}
      >
        <ul className="pb-3 mt-4 space-y-3 -pt-3">
          {data?.map((item) => (
            <li key={item.id}>
              <LocalizedClientLink
                href={`/categories/${item.handle}`}
                className="text-xs text-black capitalize"
              >
                {item.name}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionComponent;
