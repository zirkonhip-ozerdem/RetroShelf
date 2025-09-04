import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CatalogItem} from '../../features/catalog/types';

type ShelfState = {
  items: CatalogItem[];
  add: (item: CatalogItem) => void;
  remove: (id: string) => void;
};

export const useShelf = create<ShelfState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        if (!get().items.some(i => i.id === item.id)) {
          set({items: [...get().items, item]});
        }
      },
      remove: (id) => {
        set({items: get().items.filter(i => i.id !== id)});
      },
    }),
    {
      name: 'retro-shelf-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
