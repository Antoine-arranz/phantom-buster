import { useEffect, useState } from "react";
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

export const KEY = "phantom";

/**
 * Custom hook for interacting with the API.
 * @returns {{
 *   phantoms: IPhantoms | undefined,
 *   phantom: IPhantom | undefined,
 *   categories: string[] | undefined,
 *   getPhantoms: (searchParams?: SearchParams) => Promise<IPhantoms>,
 *   deletePhantom: (id: string) => Promise<void>,
 *   getCategories: () => Promise<string[] | undefined>,
 *   setCategories: React.Dispatch<React.SetStateAction<string[] | undefined>>,
 *   renamePhantom: (id: string, newName: string) => Promise<void>,
 *   duplicatedPhantom: (id: string) => Promise<void>,
 *   getPhantomById: (id: string) => Promise<IPhantom | undefined>,
 *   setPhantom: React.Dispatch<React.SetStateAction<IPhantom | undefined>>,
 *   setPhantoms: React.Dispatch<React.SetStateAction<IPhantoms | undefined>>
 * }} - Object containing the hook's results and functions.
 */
export const useApiHook = (): {
  phantoms: IPhantoms | undefined;
  phantom: IPhantom | undefined;
  categories: string[] | undefined;
  getPhantoms: (searchParams?: SearchParams) => Promise<IPhantoms>;
  deletePhantom: (id: string) => void;
  getCategories: () => Promise<string[] | undefined>;
  setCategories: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  renamePhantom: (id: string, newName: string) => Promise<void>;
  duplicatedPhantom: (id: string) => Promise<void>;
  getPhantomById: (id: string) => Promise<IPhantom | undefined>;
  setPhantom: React.Dispatch<React.SetStateAction<IPhantom | undefined>>;
  setPhantoms: React.Dispatch<React.SetStateAction<IPhantoms | undefined>>;
} => {
  const [phantoms, setPhantoms] = useState<IPhantoms>();
  const [categories, setCategories] = useState<string[]>();
  const { setItem, getItem } = useLocalStorage();
  const [phantom, setPhantom] = useState<IPhantom>();

  useEffect(() => {
    try {
      getPhantoms().then((phantom) => setPhantoms(phantom));
      getCategories().then((categories) => setCategories(categories));
    } catch (error) {
      notifyError(error as unknown as string);
    }
  }, []);

  /**
   * Fetches phantoms from the API and updates the state.
   * @param {SearchParams} [categories] - Optional search parameters.
   * @returns {Promise<IPhantoms>} - Promise resolving to the fetched phantoms.
   */
  const getPhantoms = async (
    categories: SearchParams = {}
  ): Promise<IPhantoms> => {
    const phantomCached = getItem(KEY);
    if (phantomCached) {
      const phamtoms = filterPhantomByCategory(
        JSON.parse(phantomCached),
        categories
      );
      return phamtoms;
    }
    const phantoms = await getPhantomsApi(categories);
    setItem(KEY, JSON.stringify(phantoms));

    return phantoms;
  };

  /**
   * Fetches categories from the API and updates the state.
   * @returns {Promise<string[] | undefined>} - Promise resolving to the fetched categories or undefined if an error occurs.
   */
  const getCategories = async (): Promise<string[] | undefined> => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const categories = collectCategories(JSON.parse(phantomCached));
        return categories;
      }
      const categories = await getCategoriesApi();
      return categories;
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  /**
   * Deletes a phantom by ID.
   * @param {string} id - ID of the phantom to delete.
   * @returns {Promise<void>} - Promise resolving once the deletion is completed.
   */
  const deletePhantom = async (id: string): Promise<void> => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const phantoms = await deletePhantomApi(id, JSON.parse(phantomCached));
        setItem(KEY, JSON.stringify(phantoms));
        return;
      }
      const phantoms = await deletePhantomApi(id);
      setItem(KEY, JSON.stringify(phantoms));
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  /**
   * Renames a phantom.
   * @param {string} id - ID of the phantom to rename.
   * @param {string} newName - New name for the phantom.
   * @returns {Promise<void>} - Promise resolving once the renaming is completed.
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
   * @returns {Promise<void>} - Promise resolving once the duplication is completed.
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
   * Fetches a phantom by ID.
   * @param {string} id - ID of the phantom to fetch.
   * @returns {Promise<IPhantom | undefined>} - Promise resolving to the fetched phantom or undefined if not found.
   */
  const getPhantomById = async (id: string): Promise<IPhantom | undefined> => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const phantom = await getPhantomByIdApi(id, JSON.parse(phantomCached));
        return phantom;
      }
      const phantom = await getPhantomByIdApi(id);
      return phantom;
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
    setPhantom,
    setPhantoms,
    setCategories,
  };
};
