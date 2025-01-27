import { useState } from 'react';

const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return { isOpen, toggle: toggleDrawer };
};

export default useToggle;
