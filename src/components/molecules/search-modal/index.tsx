import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/elements/button';
import { SearchInput } from '@/components/elements/search-input';
import { usePathname } from 'next/navigation';

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const isSearchPage = !!pathname.includes('search');

  const handleOpenModal = () => setIsOpen((p) => !p);

  return (
    <>
      {/* Button to open modal */}
      {!isSearchPage ? (
        <Button
          title="Search"
          icon={<Image src="/search.svg" alt="" width={16} height={16} />}
          iconPosition="left"
          shadowStrength="sm"
          variant="primary"
          size="sm"
          onClick={handleOpenModal}
          noTextOnMobile
        />
      ) : (
        <span className="w-[200px]"></span>
      )}
      {/* Modal */}
      <Dialog
        open={isSearchPage ? false : isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <Dialog.Panel className="w-full max-w-xl p-6 rounded-md shadow-lg bg-gray-light">
          <div>
            <SearchInput />
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default SearchModal;
