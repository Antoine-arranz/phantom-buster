import { useEffect, useState } from "react";
import { getCategoriesApi, getPhantomsApi } from "../api/dashboard";
import { IPhantoms } from "../data/phantoms";
import { useLocalStorage } from "./localStorageHook";

export enum ApiEnum {
  Phantom = "phantom",
  Categorie = "categorie",
}

export const KEY = "phantom";

export const useApiHook = <T extends IPhantoms[] | string[]>(
  api?: ApiEnum,
  categories?: string[]
): {
  result: T;
  getPhantoms: (categories?: string[]) => void;
} => {
  const [result, setResult] = useState<IPhantoms | string[]>();
  const { setItem, getItem } = useLocalStorage();

  try {
    useEffect(() => {
      getPhantoms(categories);
    }, [api, categories]);
  } catch (error) {
    console.log(error);
  }

  const getPhantoms = (categories?: string[]): void => {
    if (api === ApiEnum.Phantom) {
      if (categories) {
        const phantoms = getPhantomsApi(categories);
        setResult(phantoms);
        return;
      }
      const phantomCached = getItem(KEY);
      if (phantomCached) {
        setResult(JSON.parse(phantomCached));
        return;
      } else {
        const phantoms = getPhantomsApi();
        setResult(phantoms);
        setItem(KEY, JSON.stringify(phantoms));
      }
    } else if (api === ApiEnum.Categorie) {
      setResult(getCategoriesApi());
    }
  };

  return { result: result as T, getPhantoms };
};
