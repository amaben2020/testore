import useToggle from '@/hooks/useToggle';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import Drawer from 'react-modern-drawer';
import { countries } from './data/countries';
import Dropdown from '@/components/elements/dropdown';

const MenuDrawer = ({ isOpen, toggleDrawer }) => {
  const { countryCode } = useParams();
  console.log(countryCode);

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      className="w-[200px] xl:min-w-[400px] bla border"
    >
      <aside className="flex flex-col gap-3 border bg-gray-light">
        <nav className="bg-white border-b shadow-sm">
          <div>
            {/* Links */}
            <div className="flex flex-col items-center space-x-6 text-gray-700">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link href="/store" className="hover:text-blue-600">
                Store
              </Link>
              <Link href="/account" className="hover:text-blue-600">
                Account
              </Link>
              <Link href="/cart" className="hover:text-blue-600">
                Cart
              </Link>
            </div>

            {/* Dropdown */}
            <Dropdown />

            {/* <div className="relative group">
              <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-blue-600">
                <span>Shipping to:</span>
                <span className="font-semibold">Select Country</span>
              </div>

              <div className="absolute z-10 hidden w-56 mt-2 bg-white border border-gray-200 rounded-md shadow-lg group-hover:block">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    className="flex items-center p-3 space-x-4 cursor-pointer hover:bg-blue-50"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-medium text-gray-700">
                      {country.name} ({country.code.toUpperCase()})
                    </span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Footer */}
          <footer className="py-4 mt-6 text-sm text-center text-gray-500 border-t">
            © 2025 Medusa Store. All rights reserved.
          </footer>
        </nav>
      </aside>
    </Drawer>
  );
};

export default MenuDrawer;
