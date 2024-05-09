import { useEffect, useState } from "react";
import {
  deletePhantomApi,
  getCategoriesApi,
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
 *   categories: string[] | undefined,
 *   getPhantoms: (searchParams?: SearchParams) => void,
 *   deletePhantom: (id: string) => void,
 *   getCategories: () => void,
 *   renamePhantom: (id: string, newName: string) => Promise<IPhantom[] | undefined>
 * }} - Object containing the hook's results and functions.
 */
export const useApiHook = (): {
  phantoms: IPhantoms | undefined;
  categories: string[] | undefined;
  getPhantoms: (searchParams?: SearchParams) => void;
  deletePhantom: (id: string) => void;
  getCategories: () => void;
  renamePhantom: (
    id: string,
    newName: string
  ) => Promise<IPhantom[] | undefined>;
} => {
  const [phantoms, setPhantoms] = useState<IPhantoms>();
  const [categories, setCategories] = useState<string[]>();
  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {
    try {
      getPhantoms();
      getCategories();
    } catch (error) {
      notifyError(error as unknown as string);
    }
  }, []);

  /**
   * Fetches phantoms from the API and updates the state.
   * @param {SearchParams} [searchParams] - Optional search parameters.
   * @returns {void}
   */
  const getPhantoms = async (categories: SearchParams = {}): Promise<void> => {
    const phantomCached = getItem(KEY);
    if (phantomCached) {
      const phamtom = filterPhantomByCategory(
        JSON.parse(phantomCached),
        categories
      );
      setPhantoms(phamtom);
      return;
    }
    const phantoms = await getPhantomsApi(categories);
    setPhantoms(phantoms);
    setItem(KEY, JSON.stringify(phantoms));
  };

  /**
   * Fetches categories from the API and updates the state.
   * @returns {void}
   */
  const getCategories = async () => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const categories = collectCategories(JSON.parse(phantomCached));
        setCategories(categories);
        return;
      }
      setCategories(await getCategoriesApi());
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  /**
   * Deletes a phantom by ID.
   * @param {string} id - ID of the phantom to delete.
   * @returns {void}
   */
  const deletePhantom = async (id: string): Promise<void> => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const phantoms = await deletePhantomApi(id, JSON.parse(phantomCached));
        setPhantoms(phantoms);
        setItem(KEY, JSON.stringify(phantoms));
        return;
      }
      const phantoms = await deletePhantomApi(id);
      setPhantoms(phantoms);
      setItem(KEY, JSON.stringify(phantoms));
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  /**
   * Renames a phantom.
   * @param {string} id - ID of the phantom to rename.
   * @param {string} newName - New name for the phantom.
   * @returns {Promise<IPhantom[] | undefined>} - Updated list of phantoms.
   */
  const renamePhantom = async (
    id: string,
    newName: string
  ): Promise<IPhantom[] | undefined> => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const phantoms = await renamePhantomApi(
          JSON.parse(phantomCached),
          id,
          newName
        );
        if (phantoms) {
          setPhantoms(phantoms);
          setItem(KEY, JSON.stringify(phantoms));
          return phantoms;
        }
      }
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  return {
    phantoms,
    categories,
    getPhantoms,
    deletePhantom,
    getCategories,
    renamePhantom,
  };
};
