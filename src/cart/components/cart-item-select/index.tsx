'use client';

import ChevronDown from '@/components/icons/chevron-down';
import { IconBadge, clx } from '@medusajs/ui';
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type NativeSelectProps = {
  placeholder?: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = 'Select...', className, children, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(false);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    );

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === '') {
        setIsPlaceholder(true);
      } else {
        setIsPlaceholder(false);
      }
    }, [innerRef.current?.value]);

    return (
      <div>
        <IconBadge
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            'relative flex items-center txt-compact-small border text-ui-fg-base group',
            className,
            {
              'text-ui-fg-subtle': isPlaceholder,
            }
          )}
        >
          <select
            ref={innerRef}
            {...props}
            className="items-center justify-center w-16 h-16 px-4 transition-colors duration-150 bg-transparent border-none outline-none appearance-none focus:border-gray-700"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="absolute flex justify-end w-8 pointer-events-none group-hover:animate-pulse">
            <ChevronDown />
          </span>
        </IconBadge>
      </div>
    );
  }
);

CartItemSelect.displayName = 'CartItemSelect';

export default CartItemSelect;
