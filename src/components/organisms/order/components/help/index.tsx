import LocalizedClientLink from '@/components/elements/localized-link';
import { Heading } from '@medusajs/ui';

import React from 'react';

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">Need help?</Heading>
      <div className="my-2 text-base-regular">
        <ul className="flex flex-col gap-y-2">
          <li>
            <LocalizedClientLink href="/contact">Contact</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              Returns & Exchanges
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
