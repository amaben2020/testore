// Socials and Legal Links Data

export type TSocialLinks = {
  id: number;
  name: string;
  href: string;
};

export const socials = [
  { id: 1, name: 'Facebook', href: 'https://facebook.com' },
  { id: 2, name: 'LinkedIn', href: 'https://linkedin.com' },
  { id: 3, name: 'Twitter', href: 'https://twitter.com' },
  { id: 4, name: 'Instagram', href: 'https://instagram.com' },
  { id: 5, name: 'GitHub', href: 'https://github.com' },
];

export const legals = [
  { id: 1, name: 'Settings', href: '/settings' },
  { id: 2, name: 'Contact', href: '/contact' },
  { id: 3, name: 'Licenses', href: '/licenses' },
  { id: 4, name: 'Privacy', href: '/privacy' },
  { id: 5, name: 'Terms', href: '/terms' },
];
