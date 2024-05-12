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
import { findByKey } from "../utils/findByKey";

export const KEY = "phantom";

/**
 * Custom hook for interacting with the API phantoms.
 * @returns {{
 *   phantoms: IPhantoms | undefined,
 *   phantom: IPhantom | undefined,
 *   loading: boolean
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
  loading: boolean;
  getPhantoms: () => Promise<void>;
  deletePhantom: (id: string) => void;
  getCategories: () => Promise<void>;
  renamePhantom: (id: string, newName: string) => Promise<void>;
  duplicatedPhantom: (id: string) => Promise<void>;
  getPhantomById: (id: string) => Promise<void>;
} => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      notifyError(error as unknown as string);
      setLoading(false);
    }
  };

  /**
   * Fetches categories from the API and updates the state.
   * @returns {Promise<void>} - Promise resolving to the fetched categories and the state is updated
   */
  const getCategories = async (): Promise<void> => {
    try {
      setLoading(true);
      let newCategories = categories;
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        newCategories = collectCategories(JSON.parse(phantomCached));
      } else {
        newCategories = await getCategoriesApi();
      }
      setCategories(newCategories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      setLoading(true);
      let result = phantoms;
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        result = await deletePhantomApi(id, JSON.parse(phantomCached));
      } else {
        result = await deletePhantomApi(id);
      }
      setItem(KEY, JSON.stringify(result));
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      setLoading(true);
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const phantoms = await duplicatePhantomApi(
          JSON.parse(phantomCached),
          id
        );
        setItem(KEY, JSON.stringify(phantoms));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      setLoading(true);
      let result = phantom;
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        result = findByKey(JSON.parse(phantomCached), id, "id");
      } else {
        result = await getPhantomByIdApi(id);
      }
      setPhantom(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setPhantom(undefined);
      notifyError(error as unknown as string);
    }
  };

  return {
    phantoms,
    categories,
    phantom,
    loading,
    getPhantoms,
    deletePhantom,
    getCategories,
    renamePhantom,
    duplicatedPhantom,
    getPhantomById,
  };
};
