'use client';
import Button from '@/components/elements/button';
import Image from 'next/image';
import 'react-modern-drawer/dist/index.css';
import MenuDrawer from '../drawer';
import useToggle from '@/hooks/useToggle';

const Navbar = () => {
  const { toggle: toggleDrawer, isOpen } = useToggle();

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
