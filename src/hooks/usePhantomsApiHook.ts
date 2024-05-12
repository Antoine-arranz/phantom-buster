import { useState } from "react";
import {
  deletePhantomApi,
  duplicatePhantomApi,
  getCategoriesApi,
  getPhantomByIdApi,
  getPhantomsApi,
  renamePhantomApi,
} from "../api/dashboard";
import { IPhantom, IPhantoms } from "../data/phantoms";
import { useLocalStorage } from "./localStorageHook";
import filterPhantomByCategory from "../utils/filterPhantomByCategory";
import collectCategories from "../utils/collectCategories ";
import { notifyError } from "../utils/notify";
import { SearchParams } from "../interfaces/searchParams";
import { useSearchParams } from "react-router-dom";
import { SEARCH_KEY } from "../components/SearchBar/SearchBar";
import { PLATFORMS } from "../components/FilterSideBar/FilterSideBar";

export const KEY = "phantom";

/**
 * Custom hook for interacting with the API phantoms.
 * @returns {{
 *   phantoms: IPhantoms | undefined,
 *   phantom: IPhantom | undefined,
 *   categories: string[] | undefined,
 *   getPhantoms: () => Promise<void>,
 *   deletePhantom: (id: string) => Promise<void>,
 *   getCategories: () => Promise<void>,
 *   renamePhantom: (id: string, newName: string) => Promise<void>,
 *   duplicatedPhantom: (id: string) => Promise<void>,
 *   getPhantomById: (id: string) => Promise<void>,
 * }} - Object containing the hook's results and functions.
 */
export const usePhantomsApi = (): {
  phantoms: IPhantoms | undefined;
  phantom: IPhantom | undefined;
  categories: string[] | undefined;
  getPhantoms: () => Promise<void>;
  deletePhantom: (id: string) => void;
  getCategories: () => Promise<void>;
  renamePhantom: (id: string, newName: string) => Promise<void>;
  duplicatedPhantom: (id: string) => Promise<void>;
  getPhantomById: (id: string) => Promise<void>;
} => {
  const [phantoms, setPhantoms] = useState<IPhantoms>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { setItem, getItem } = useLocalStorage();
  const [phantom, setPhantom] = useState<IPhantom>();
  const [searchParams] = useSearchParams();

  /**
   * Fetches phantoms from the API and updates the state.
   * @returns {Promise<void>} - Promise resolving once the operation is completed.
   */
  const getPhantoms = async (): Promise<void> => {
    try {
      let result = phantoms;
      const phantomCached = getItem(KEY);
      const platformFilter = searchParams.get(PLATFORMS);
      const searchFilter = searchParams.get(SEARCH_KEY);
      const filters: SearchParams = {
        platform: platformFilter,
        search: searchFilter,
      };

      if (phantomCached) {
        result = filterPhantomByCategory(JSON.parse(phantomCached), filters);
      } else {
        const phantoms = await getPhantomsApi();
        result = await getPhantomsApi(filters);
        await getCategories();
        setItem(KEY, JSON.stringify(phantoms));
      }
      setPhantoms(result);
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  /**
   * Fetches categories from the API and updates the state.
   * @returns {Promise<void>} - Promise resolving to the fetched categories and the state is updated
   */
  const getCategories = async (): Promise<void> => {
    try {
      let newCategories = categories;
      const phantomCached = getItem(KEY);

      if (phantomCached) {
        newCategories = collectCategories(JSON.parse(phantomCached));
      } else {
        newCategories = await getCategoriesApi();
      }
      setCategories(newCategories);
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  /**
   * Deletes a phantom by ID.
   * @param {string} id - ID of the phantom to delete.
   * @returns {Promise<void>} - Promise resolving once the deletion is completed and the local storage is updated.
   */
  const deletePhantom = async (id: string): Promise<void> => {
    try {
      let result = phantoms;
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        result = await deletePhantomApi(id, JSON.parse(phantomCached));
      } else {
        result = await deletePhantomApi(id);
      }
      setItem(KEY, JSON.stringify(result));
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  /**
   * Renames a phantom.
   * @param {string} id - ID of the phantom to rename.
   * @param {string} newName - New name for the phantom.
   * @returns {Promise<void>} - Promise resolving once the renaming is completed and the state is updated.
   */
  const renamePhantom = async (id: string, newName: string): Promise<void> => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const phantoms = await renamePhantomApi(
          JSON.parse(phantomCached),
          id,
          newName
        );
        if (phantoms) {
          setItem(KEY, JSON.stringify(phantoms));
        }
      }
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  /**
   * Duplicates a phantom.
   * @param {string} id - ID of the phantom to duplicate.
   * @returns {Promise<void>} - Promise resolving once the duplication is completed and the local storage is updated.
   */
  const duplicatedPhantom = async (id: string): Promise<void> => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const phantoms = await duplicatePhantomApi(
          JSON.parse(phantomCached),
          id
        );
        setItem(KEY, JSON.stringify(phantoms));
      }
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  /**
   * Fetches a phantom by ID and updates the state.
   * @param {string} id - ID of the phantom to fetch.
   * @returns {Promise<void>} - Promise resolving once the phantom is fetched and the state is updated.
   */
  const getPhantomById = async (id: string): Promise<void> => {
    try {
      let result = phantom;
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        result = await getPhantomByIdApi(id, JSON.parse(phantomCached));
      } else {
        result = await getPhantomByIdApi(id);
      }
      setPhantom(result);
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  return {
    phantoms,
    categories,
    phantom,
    getPhantoms,
    deletePhantom,
    getCategories,
    renamePhantom,
    duplicatedPhantom,
    getPhantomById,
  };
};
