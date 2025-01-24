'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { countries } from '@/components/molecules/drawer/data/countries';

const RegionDropdown = () => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const getUpdatedPath = (newCode: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && segments[0].length === 2) {
      segments[0] = newCode;
    } else {
      segments.unshift(newCode);
    }
    return `/${segments.join('/')}`;
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => setIsHovered((p) => !p)}
    >
      {/* Button */}
      <button
        type="button"
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold bg-white rounded-md shadow text-gray-dark gap-x-2 hover:bg-gray-50"
        id="menu-button"
        aria-expanded={isHovered}
        aria-haspopup="true"
      >
        Select:
        <span className="text-gray-700">Country</span>
        <svg
          className="w-4 h-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isHovered && (
        <div
          className="absolute z-10 mt-2 bg-white rounded-md shadow-lg -right-10 w-52 ring-1 ring-black/5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <ul className="py-1">
            {countries.map((country) => (
              <li key={country.code}>
                <Link
                  href={getUpdatedPath(country.code)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <span className="mr-2">{country.flag}</span>
                  <span className="truncate">{country.name}</span>
                  <span className="ml-auto text-gray-500">{country.code}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegionDropdown;
