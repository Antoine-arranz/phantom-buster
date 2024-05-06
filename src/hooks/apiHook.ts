import { useEffect, useState } from "react";
import { getAllPhantoms, getCategories } from "../api/dashboard";
import { IPhantoms } from "../data/phantoms";

export enum ApiEnum {
  Phantom = "phantom",
  Categorie = "categorie",
}

export const useApiHook = (api: ApiEnum) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IPhantoms | undefined>(undefined);
  const [error, setError] = useState<any>(undefined);

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
    setError(error);
  }

  return [result, error, loading];
};
