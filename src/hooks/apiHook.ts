import { useEffect, useState } from "react";
import {
  deletePhantomApi,
  getCategoriesApi,
  getPhantomsApi,
} from "../api/dashboard";
import { IPhantoms } from "../data/phantoms";
import { useLocalStorage } from "./localStorageHook";
import filterPhantomByCategory from "../utils/filterPhantomByCategory";
import collectCategories from "../utils/collectCategories ";

export enum ApiEnum {
  Phantom = "phantom",
  Categorie = "categorie",
}

export const KEY = "phantom";

export const useApiHook = <T extends IPhantoms | string[]>(
  api?: ApiEnum,
  categories?: string[]
): {
  result: T;
  getPhantoms: (categories?: string[]) => void;
  deletePhantom: (id: string) => void;
  getCategories: () => void;
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
      console.log(error);
    }
  }, [api, categories]);

  //2 chose :> recupere mes phantoms ou recuperer mes phantoms filtred
  // récupere mes phantom du cache ou de l'api
  const getPhantoms = (categories: string[] = []): void => {
    const phantomCached = getItem(KEY);
    if (phantomCached) {
      const phamtom = filterPhantomByCategory(
        JSON.parse(phantomCached),
        categories
      );
      setResult(phamtom);
      return;
    }
    const phantoms = getPhantomsApi();
    setResult(phantoms);
    setItem(KEY, JSON.stringify(phantoms));
  };

  const getCategories = () => {
    const phantomCached = getItem(KEY);
    if (phantomCached) {
      const categories = collectCategories(JSON.parse(phantomCached));
      setResult(categories);
      return;
    }
    setResult(getCategoriesApi());
  };

  const deletePhantom = (id: string): void => {
    const phantomCached = getItem(KEY);
    if (phantomCached) {
      const phantoms = deletePhantomApi(id, JSON.parse(phantomCached));
      setResult(phantoms);
      setItem(KEY, JSON.stringify(phantoms));
      return;
    }
    const phantoms = deletePhantomApi(id);
    setResult(phantoms);
    setItem(KEY, JSON.stringify(phantoms));
  };

  return { result: result as T, getPhantoms, deletePhantom, getCategories };
};
