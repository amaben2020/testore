'use server';

import { HttpTypes } from '@medusajs/types';
import { getCacheOptions } from './cookies';
import { sdk } from '../config';

export const retrieveCollection = async (id: string) => {
  const next = {
    ...(await getCacheOptions('collections')),
  };

  return sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(
      `/store/collections/${id}`,
      {
        next,
        cache: 'force-cache',
      }
    )
    .then(({ collection }) => collection);
};

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const next = {
    ...(await getCacheOptions('collections')),
  };

  queryParams.limit = queryParams.limit || '100';
  queryParams.offset = queryParams.offset || '0';

  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
      '/store/collections',
      {
        query: queryParams,
        next,
        cache: 'force-cache',
      }
    )
    .then(({ collections }) => ({ collections, count: collections.length }));
};

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection> => {
  const next = {
    ...(await getCacheOptions('collections')),
  };

  console.log('handle===>', handle);

  return sdk.client
    .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
      query: {
        handle,
        fields: '*products,*products.variants',
      },
      next,
      cache: 'force-cache',
    })
    .then(({ collections }) => collections[0]);
};

// &fields=*variants.calculated_price,*products
