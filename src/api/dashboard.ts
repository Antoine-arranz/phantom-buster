import { IPhantoms } from "../data/phantoms";
import data from "../data/phantoms.json";

export const getAllPhantoms = (): IPhantoms => {
  setTimeout(() => console.log("fetching getAllPhantoms"), 200);
  return data as IPhantoms;
};

export const getCategories = (): any => {
  const categories = new Set(); // Utilisation d'un ensemble pour stocker les catégories uniques
  data.forEach((item) => {
    const itemCategories = item.manifest.tags.categories; // Récupérer les catégories de chaque objet
    itemCategories.forEach((category) => categories.add(category)); // Ajouter chaque catégorie à l'ensemble
  });
  return Array.from(categories);
};

export const deletePhantom = (): IPhantoms => {
  setTimeout(() => console.log("fetching deletePhantom"), 200);
  return data as IPhantoms;
};
