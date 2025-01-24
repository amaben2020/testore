// 'use server';

import { redirect } from 'next/navigation';
import { PlaceholdersAndVanishInput } from '../placeholder-vanish-input';
import { useState } from 'react';

export function SearchInput() {
  // const [searchTerm, setSearchTerm] = useState('');

  const placeholders = [
    'Black sweatshirt with zipper?..',
    'Herman Miller Luxury chair?',
    'Technical backpack with invisible seams?',
    'Headset plus extreme audio?',
    'Smart watch with seamless band integration?',
    'Desk speaker with geometric form?',
  ];

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (searchTerm) redirect(`/search?q=${searchTerm}`);
  // };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h2 className="mb-10 text-xl text-center text-gray-dark sm:mb-20 sm:text-5xl">
        Search Products
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        // onChange={handleChange}
        // onSubmit={onSubmit}
      />
    </div>
  );
}
