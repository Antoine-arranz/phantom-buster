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

export enum ApiEnum {
  Phantom = "phantom",
  Categorie = "categorie",
}

export const KEY = "phantom";

/**
 * Custom hook for interacting with the API.
 * @template T - Type of the result returned by the API.
 * @param {ApiEnum} [api] - enum specifying the type of API.
 * @param {string[]} [categories] - Optional array of categories.
 * @returns {{
 *   result: T,
 *   getPhantoms: (categories?: string[]) => Promise<void>,
 *   deletePhantom: (id: string) => Promise<void>,
 *   getCategories: () => Promise<void>
 * }} - Object containing the hook's results and functions.
 */
export const useApiHook = <T extends IPhantoms | string[]>(
  api?: ApiEnum,
  categories?: SearchParams
): {
  result: T;
  getPhantoms: (searchParams?: SearchParams) => void;
  deletePhantom: (id: string) => void;
  getCategories: () => void;
  renamePhantom: (
    id: string,
    newName: string
  ) => Promise<IPhantom[] | undefined>;
} => {
  const [result, setResult] = useState<IPhantoms | string[]>();
  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {
    try {
      if (api === ApiEnum.Phantom) {
        getPhantoms(categories);
      } else if (api === ApiEnum.Categorie) {
        getCategories();
      }
    } catch (error) {
      notifyError(error as unknown as string);
    }
  }, [api, categories]);

  const getPhantoms = async (categories: SearchParams = {}): Promise<void> => {
    const phantomCached = getItem(KEY);
    if (phantomCached) {
      const phamtom = filterPhantomByCategory(
        JSON.parse(phantomCached),
        categories
      );
      setResult(phamtom);
      return;
    }
    const phantoms = await getPhantomsApi(categories);
    setResult(phantoms);
    setItem(KEY, JSON.stringify(phantoms));
  };

  const getCategories = async () => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const categories = collectCategories(JSON.parse(phantomCached));
        setResult(categories);
        return;
      }
      setResult(await getCategoriesApi());
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  const deletePhantom = async (id: string): Promise<void> => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        const phantoms = await deletePhantomApi(id, JSON.parse(phantomCached));
        setResult(phantoms);
        setItem(KEY, JSON.stringify(phantoms));
        return;
      }
      const phantoms = await deletePhantomApi(id);
      setResult(phantoms);
      setItem(KEY, JSON.stringify(phantoms));
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  const renamePhantom = async (
    id: string,
    newName: string
  ): Promise<IPhantom[] | undefined> => {
    try {
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        console.log("ici ???");
        const phantoms = await renamePhantomApi(
          JSON.parse(phantomCached),
          id,
          newName
        );
        if (phantoms) {
          console.log("phan", phantoms);
          setResult(phantoms);
          setItem(KEY, JSON.stringify(phantoms));
          return phantoms;
        }
      }
    } catch (error) {
      notifyError(error as unknown as string);
    }
  };

  return {
    result: result as T,
    getPhantoms,
    deletePhantom,
    getCategories,
    renamePhantom,
  };
};
