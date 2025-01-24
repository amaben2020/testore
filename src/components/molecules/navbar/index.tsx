'use client';
import Button from '@/components/elements/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const countries = [
    { name: 'Denmark', code: 'dn', flag: '🇩🇰' },
    { name: 'France', code: 'fr', flag: '🇫🇷' },
    { name: 'Germany', code: 'de', flag: '🇩🇪' },
    { name: 'Italy', code: 'it', flag: '🇮🇹' },
    { name: 'Spain', code: 'es', flag: '🇪🇸' },
    { name: 'Sweden', code: 'se', flag: '🇸🇪' },
    { name: 'United States', code: 'us', flag: '🇺🇸' },
    { name: 'Nigeria', code: 'ng', flag: '🇳🇬' },
    { name: 'United Kingdom', code: 'uk', flag: '🇬🇧' },
  ];

  return (
    <nav className="py-3 mb-2 shadow-md xl:mb-4 xl:py-5 bg-gray-light">
      <ul className="flex items-center justify-between h-full px-3 mx-auto xl:px-16">
        <Button
          title="Menu"
          icon={<Image src="/menu.svg" alt="" width={16} height={16} />}
          iconPosition="left"
          shadowStrength="sm"
          variant="primary"
          size="sm"
          onClick={toggleDrawer}
          noTextOnMobile
        />
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
                <div className="relative group">
                  <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-blue-600">
                    <span>Shipping to:</span>
                    <span className="font-semibold">Select Country</span>
                  </div>
                  {/* Dropdown Menu */}
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
                </div>
              </div>

              {/* Footer */}
              <footer className="py-4 mt-6 text-sm text-center text-gray-500 border-t">
                © 2025 Medusa Store. All rights reserved.
              </footer>
            </nav>
          </aside>
        </Drawer>

        {/* Logo */}

        <Image
          src="/testore.svg"
          alt=""
          className="xl:w-[155px] w-[72px]"
          width={155}
          height={45}
        />

        {/* Right Items */}
        <div className="flex space-x-2 xl:space-x-6">
          <Button
            title="Search"
            icon={<Image src="/search.svg" alt="" width={16} height={16} />}
            iconPosition="left"
            shadowStrength="sm"
            variant="primary"
            size="sm"
            onClick={() => alert('Button clicked!')}
            noTextOnMobile
          />
          <Button
            title="Account"
            iconPosition="left"
            shadowStrength="sm"
            variant="primary"
            size="sm"
            href="/account"
            icon={<Image src="/account.svg" alt="" width={20} height={16} />}
            noTextOnMobile
          />
          <Button
            title="Cart(1)"
            icon={<Image src="/cart.svg" alt="" width={18} height={16} />}
            iconPosition="left"
            shadowStrength="sm"
            variant="primary"
            size="sm"
            href="/cart"
            noTextOnMobile
          />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
