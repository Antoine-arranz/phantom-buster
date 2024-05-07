import { IPhantoms } from "../data/phantoms";

const filterPhantomByCategory = (data: IPhantoms, categories: string[]) => {
  if (categories.length === 0) {
    return data;
  }
  return data.filter((item) => {
    if (item.manifest && item.manifest.tags && item.manifest.tags.categories) {
      for (let category of categories) {
        if (item.manifest.tags.categories.includes(category)) {
          return true;
        }
      }
    }
    return false;
  });
};

export default filterPhantomByCategory;
