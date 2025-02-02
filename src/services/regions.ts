'use server';

import { HttpTypes } from '@medusajs/types';
import { getCacheOptions } from './cookies';
import { sdk } from '../lib/config';
import medusaError from '../lib/util/medusa-error';
import { fetchAPI } from '@/services/base';

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions('regions')),
  };

  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: 'GET',
      next,
      cache: 'force-cache',
    })
    .then(({ regions }) => regions)
    .catch(medusaError);
};

const regionMap = new Map<string, HttpTypes.StoreRegion>();

export const getRegion = async (countryCode: string) => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode);
    }

    const { regions } = await fetchAPI('/store/regions');

    if (!regions) {
      return null;
    }

    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? '', region);
      });
    });

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get('us');

    return region;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
    return null;
  }
};
