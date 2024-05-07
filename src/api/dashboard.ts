import { IPhantoms } from "../data/phantoms";
import data from "../data/phantoms.json";

export const getPhantomsApi = (categories?: string[]): IPhantoms => {
  if (categories) {
    return data.filter((item) => {
      if (
        item.manifest &&
        item.manifest.tags &&
        item.manifest.tags.categories
      ) {
        // Vérifier si au moins une catégorie de l'élément correspond à une des catégories données
        for (let category of categories) {
          if (item.manifest.tags.categories.includes(category)) {
            return true;
          }
        }
      }
      return false;
    }) as IPhantoms;
  } else {
    return data as IPhantoms;
  }
};

export const getCategoriesApi = (): string[] => {
  const categories = new Set<string>();
  data.forEach((item) => {
    const itemCategories = item.manifest.tags.categories;
    itemCategories.forEach((category) => categories.add(category));
  });
  return Array.from(categories);
};

export const deletePhantom = (): IPhantoms => {
  setTimeout(() => console.log("fetching deletePhantom"), 200);
  return data as IPhantoms;
};

export const deletePhantomApi = (
  id: string,
  phantoms?: IPhantoms
): IPhantoms => {
  if (phantoms) {
    return phantoms.filter((phantom) => phantom.id !== id) as IPhantoms;
  }
  return data.filter((phantom) => phantom.id !== id) as IPhantoms;
};
