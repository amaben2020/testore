import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import Drawer from 'react-modern-drawer';
import RegionDropdown from '@/components/elements/dropdown';
import { menuItems } from './data/menu';
import clsx from 'clsx';

const MenuDrawer = ({
  isOpen,
  toggleDrawer,
}: {
  isOpen: boolean;
  toggleDrawer: () => void;
}) => {
  const { countryCode } = useParams();
  const pathname = usePathname();

  console.log(pathname);
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      className="border"
    >
      <aside className="flex flex-col h-full bg-gray-light">
        {/* Current Region */}
        <div className="p-4 bg-white border-b shadow-sm">
          <p className="flex items-center gap-3 text-sm">
            <span className="font-medium ">Your Region:</span>
            <span className="font-bold uppercase">{countryCode}</span>
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="flex flex-col py-4 space-y-2">
            {menuItems.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={clsx(
                    pathname.includes(href) && label !== 'Home'
                      ? 'text-lg font-bold'
                      : '',
                    'block px-6 py-3  text-gray-dark hover:bg-gray-200 hover:text-blue-600 text-md'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Region Dropdown */}
          <div className="px-6">
            <RegionDropdown />
          </div>{' '}
        </nav>

        {/* Footer */}
        <footer className="py-4 text-sm text-center text-gray-500 border-t">
          © 2025 Te Store. All rights reserved.
        </footer>
      </aside>
    </Drawer>
  );
};

export default MenuDrawer;
