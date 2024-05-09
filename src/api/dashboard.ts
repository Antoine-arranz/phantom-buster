import { IPhantom, IPhantoms } from "../data/phantoms";
import data from "../data/phantoms.json";
import { SearchParams } from "../interfaces/searchParams";
import collectCategories from "../utils/collectCategories ";
import filterPhantomByCategory from "../utils/filterPhantomByCategory";
import { generateUniqueId } from "../utils/generateUniqueId";

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

export const renamePhantomApi = (
  phantom: IPhantoms,
  id: string,
  newName: string
): Promise<IPhantoms> => {
  return new Promise((resolve, reject) => {
    const index = phantom.findIndex((item) => item.id === id);
    if (index !== -1) {
      phantom[index].name = newName;
      resolve(phantom as IPhantoms);
    } else {
      reject(new Error("Phantom not found"));
    }
  });
};

export const duplicatePhantomApi = (
  phantoms: IPhantoms,
  id: string
): Promise<IPhantoms> => {
  return new Promise((resolve, reject) => {
    const index = phantoms.findIndex((phantom) => phantom.id === id);

    if (index !== -1) {
      const phantomToDuplicate = phantoms[index];
      const duplicatedPhantom = { ...phantomToDuplicate };

      duplicatedPhantom.id = generateUniqueId();

      phantoms.splice(index + 1, 0, duplicatedPhantom);

      resolve(phantoms);
    } else {
      reject(new Error("Phantom not found"));
    }
  });
};

export const getPhantomByIdApi = (
  id: string,
  phantoms: IPhantoms = data as IPhantoms
): Promise<IPhantom> => {
  return new Promise((resolve, reject) => {
    const foundPhantom = phantoms.find((phantom) => phantom.id === id);

    if (foundPhantom) {
      resolve(foundPhantom);
    } else {
      reject(new Error(`Phantom with ID ${id} not found`));
    }
  });
};
