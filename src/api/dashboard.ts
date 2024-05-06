import { IPhantoms } from "../data/phantoms";
import data from "../data/phantoms.json";

export const getAllPhantoms = (): IPhantoms[] => {
  setTimeout(() => console.log("fetching getAllPhantoms"), 200);
  return data as unknown as IPhantoms[];
};

export const getCategories = (): string[] => {
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
