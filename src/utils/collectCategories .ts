import { IPhantoms } from "../data/phantoms";

const collectCategories = (data: IPhantoms): string[] => {
  const categories = new Set<string>();
  data.forEach((phantom) => {
    const itemCategories = phantom.manifest.tags.categories;
    itemCategories.forEach((category) => categories.add(category));
  });
  return Array.from(categories);
};
export default collectCategories;
