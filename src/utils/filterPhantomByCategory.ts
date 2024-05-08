import { IPhantoms } from "../data/phantoms";
import { SearchParams } from "../interfaces/searchParams";

const filterPhantomByCategory = (
  data: IPhantoms,
  searchParams?: SearchParams
) => {
  let filteredData = data;

  // Filtrer par plateforme
  if (searchParams?.platform) {
    const platform = searchParams.platform;
    if (platform) {
      filteredData = filteredData.filter((item) =>
        item.manifest.tags.categories?.includes(platform)
      );
    }
  }

  // Filtrer par recherche
  if (searchParams?.search) {
    const search = searchParams.search.toLowerCase();
    if (search) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(search)
      );
    }
  }

  return filteredData;
};

export default filterPhantomByCategory;
