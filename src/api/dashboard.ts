import { IPhantoms } from "../data/phantoms";
import data from "../data/phantoms.json";
import { SearchParams } from "../interfaces/searchParams";
import collectCategories from "../utils/collectCategories ";
import filterPhantomByCategory from "../utils/filterPhantomByCategory";

export const getPhantomsApi = (
  categories?: SearchParams
): Promise<IPhantoms> => {
  return new Promise((resolve, reject) => {
    try {
      let phantomsData = data as IPhantoms;
      if (categories) {
        phantomsData = filterPhantomByCategory(phantomsData, categories);
      }
      resolve(phantomsData);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCategoriesApi = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      const categories = collectCategories(data as IPhantoms);
      resolve(categories);
    } catch (error) {
      reject(error);
    }
  });
};

export const deletePhantom = (): IPhantoms => {
  setTimeout(() => console.log("fetching deletePhantom"), 200);
  return data as IPhantoms;
};

export const deletePhantomApi = (
  id: string,
  phantoms?: IPhantoms
): Promise<IPhantoms> => {
  return new Promise((resolve, reject) => {
    try {
      let updatedPhantoms: IPhantoms;
      if (phantoms) {
        updatedPhantoms = phantoms.filter(
          (phantom) => phantom.id !== id
        ) as IPhantoms;
      } else {
        updatedPhantoms = data.filter(
          (phantom) => phantom.id !== id
        ) as IPhantoms;
      }
      resolve(updatedPhantoms);
    } catch (error) {
      reject(error);
    }
  });
};
