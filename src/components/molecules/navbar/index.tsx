'use client';
import Button from '@/components/elements/button';
import Image from 'next/image';
import 'react-modern-drawer/dist/index.css';
import MenuDrawer from '../drawer';
import useToggle from '@/hooks/useToggle';
import LocalizedClientLink from '@/components/elements/localized-link';
import SearchModal from '../search-modal';
import { useEffect, useState, useRef } from 'react';
import { retrieveCart } from '@/lib/data/cart';
import CartDropdown from '../cart-dropdown';
import { HttpTypes } from '@medusajs/types';

const Navbar = () => {
  const { toggle: toggleDrawer, isOpen } = useToggle();

  const [cartItem, setCartItem] = useState<HttpTypes.StoreCart | null>(null);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

  const cartDropdownRef = useRef(null);

  const fetchCartItems = async () => {
    const cart = await retrieveCart();
    setCartItem(cart);
  };

  // Fetch cart on mount and listen for updates
  useEffect(() => {
    fetchCartItems();

    const handleCartUpdate = async () => {
      await fetchCartItems();
    };

    // Listen for custom cart update events
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      cartDropdownRef.current &&
      !cartDropdownRef.current.contains(event.target)
    ) {
      setIsCartDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <MenuDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />

        {/* Logo */}
        <LocalizedClientLink href="/">
          <Image
            src="/testore.svg"
            alt=""
            className="xl:w-[155px] w-[72px]"
            width={155}
            height={45}
          />
        </LocalizedClientLink>

        {/* Right Items */}
        <div className="flex space-x-2 xl:space-x-6">
          <SearchModal />
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
          <div
            className="relative"
            ref={cartDropdownRef}
            onMouseEnter={() => setIsCartDropdownOpen(true)}
          >
            <Button
              title={`Cart(${cartItem?.items?.length || 0})`}
              icon={<Image src="/cart.svg" alt="" width={18} height={16} />}
              iconPosition="left"
              shadowStrength="sm"
              variant="primary"
              size="sm"
              href="/cart"
              noTextOnMobile
              onClick={() => setIsCartDropdownOpen((prev) => !prev)}
            />
            {isCartDropdownOpen && (
              <CartDropdown
                cartItems={cartItem?.items}
                onCartUpdate={fetchCartItems} // Optional, for direct updates
                onClose={() => setIsCartDropdownOpen(false)}
              />
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
