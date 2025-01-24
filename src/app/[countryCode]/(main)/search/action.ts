'use server';

import { redirect } from 'next/navigation';

export const searchProducts = async (formData: FormData) => {
  const allFormData = formData.entries();

  const { q, category, priceMin, priceMax, sort } =
    Object.fromEntries(allFormData);

  const buildParams = {
    ...(q && { q }),
    ...(category && { category_id: category }),
    ...(priceMin && { 'variants.calculated_price[gte]': priceMin }),
    ...(priceMax && { 'variants.calculated_price[lte]': priceMax }),
    ...(sort && { order: sort }),
  };

  const searchParams = new URLSearchParams(buildParams as any);

  redirect(`/search?${searchParams.toString()}`);
};
