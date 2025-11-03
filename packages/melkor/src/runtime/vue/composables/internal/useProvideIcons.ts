import type { IconCollection, IconCollectionName } from '../../features';

import { useNetwork } from '@vueuse/core';
import { isArray, isObject } from 'lodash-es';
import { provide } from 'vue';

import { globalIconsContextKey } from '../../features';

export function useProvideIcons() {
  const { isOnline } = useNetwork();

  const collections: IconCollection[] = [];
  const pendingCallbacks: {
    [key in IconCollectionName]?: (() => void)[];
  } = {};

  function notFoundError() {
    return new Error('Collection not found');
  }

  function getCachedCollection(collectionName: IconCollectionName) {
    return collections.find(collection => collection.name === collectionName) ?? null;
  }

  async function fetchCollection(collectionName: IconCollectionName): Promise<IconCollection> {
    try {
      const res = await fetch(`https://api.iconify.design/collection?prefix=${collectionName}`, {
        method: 'GET',
      });
      const data = await res.json();
      const collection: IconCollection = {
        name: collectionName,
        categories: [],
      };
      if (isObject(data.categories)) {
        Object.keys(data.categories).forEach((key: keyof typeof data.categories) => {
          collection.categories.push({
            label: key.toString(),
            icons: data.categories[key],
          });
        });
      }
      if (isArray(data.uncategorized)) {
        collection.categories.push({
          label: 'Uncategorized',
          icons: data.uncategorized,
        });
      }
      return collection;
    }
    catch (e) {
      if (!isOnline) {
        throw new Error('Internet connection required');
      }
      throw e;
    }
  }

  async function loadCollection(collectionName: IconCollectionName): Promise<IconCollection> {
    const cached = getCachedCollection(collectionName);
    if (cached) {
      return cached;
    }
    // A request for same ressource is already running
    if (pendingCallbacks[collectionName]) {
      const promise = new Promise<IconCollection>((resolve, reject) => {
        if (pendingCallbacks[collectionName]) {
          pendingCallbacks[collectionName].push(() => {
            const collection = getCachedCollection(collectionName);
            collection ? resolve(collection) : reject(notFoundError());
          });
        }
        else {
          reject(notFoundError());
        }
      });
      return promise;
    }
    else {
      pendingCallbacks[collectionName] = [];
      try {
        const collection = await fetchCollection(collectionName);
        collections.push(collection);
        return collection;
      }
      catch {
        throw notFoundError();
      }
      finally {
        if (pendingCallbacks[collectionName]) {
          for (const callback of pendingCallbacks[collectionName]) {
            callback();
          }
          delete pendingCallbacks[collectionName];
        }
      }
    }
  }

  provide(globalIconsContextKey, {
    loadCollection,
  });
}
