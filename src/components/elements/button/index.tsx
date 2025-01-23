import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type TButtonProps = {
  title: string;
  icon?: ReactNode; // Icon component (e.g., an SVG or JSX element)
  iconPosition?: 'left' | 'right';
  hasBorder?: boolean; // Whether the button has a border
  shadowStrength?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; // Shadow strength
  variant?: 'primary' | 'secondary' | 'danger'; // Button style variant
  size?: 'sm' | 'md' | 'lg'; // Button size
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Additional custom class names
  href?: string;
  noTextOnMobile?: boolean;
};

const Button: React.FC<TButtonProps> = ({
  title,
  icon,
  iconPosition = 'left',
  hasBorder = false,
  shadowStrength = 'md',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className,
  href,
  noTextOnMobile,
}) => {
  const buttonClasses = clsx(
    'flex items-center justify-center rounded-md font-medium transition-all',
    {
      // Variant styles
      'bg-white text-sm text-gray-dark rounded-md hover:bg-gray-light':
        variant === 'primary',
      'bg-gray-100 text-black hover:bg-gray-200': variant === 'secondary',
      'bg-red-500 text-white hover:bg-red-600': variant === 'danger',

      // Size styles
      'px-2 xl:px-4 py-1 xl:py-2 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',

      // Border styles
      'border border-gray-300': hasBorder,

      // Shadow styles
      'shadow-none': shadowStrength === 'none',
      'shadow-sm': shadowStrength === 'sm',
      'shadow-md': shadowStrength === 'md',
      'shadow-lg': shadowStrength === 'lg',
      'shadow-xl': shadowStrength === 'xl',
      'shadow-2xl': shadowStrength === '2xl',

      // Disabled state
      'opacity-50 cursor-not-allowed': disabled,
    },
    className // Additional custom classes
  );

  // If `href` is provided and no `onClick`, render a Link
  if (href && !onClick) {
    return (
      <Link href={href} className={buttonClasses}>
        {icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        <span className={clsx('block', noTextOnMobile && 'hidden xl:block')}>
          {title}
        </span>

        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      <span className={clsx('block', noTextOnMobile && 'hidden xl:block')}>
        {title}
      </span>
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
