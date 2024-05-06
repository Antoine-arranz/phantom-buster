import { useEffect, useState } from "react";
import { getAllPhantoms, getCategories } from "../api/dashboard";
import { IPhantoms } from "../data/phantoms";

export enum ApiEnum {
  Phantom = "phantom",
  Categorie = "categorie",
}

export const useApiHook = <T extends IPhantoms[] | string[]>(
  api: ApiEnum
): [T, string, boolean] => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IPhantoms[] | string[]>();
  const [error, setError] = useState<string>("");

  try {
    useEffect(() => {
      setLoading(true);
      if (api === ApiEnum.Phantom) {
        setResult(getAllPhantoms());
      } else if (api === ApiEnum.Categorie) {
        setResult(getCategories());
      }
    }, [api]);
  } catch (error) {
    setError(error as string);
  }

  return [result as T, error, loading];
};
