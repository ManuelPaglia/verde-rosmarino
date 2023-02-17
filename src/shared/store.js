import { atom } from "jotai";
import { pb } from "../services/PocketBase";
import { categories } from "../utils/const";
import { atomWithStorage } from "jotai/utils";

export const homeFilter = atom(categories[0]);

export const favoriteList = atomWithStorage("favoriteList", []);

export const detailId = atom();

export const recipeById = atom(async (get) => {
  return await pb.collection("recipes").getOne(get(detailId));
});

export const recipesByType = atom(async (get) => {
  let list = [];
  if (get(homeFilter) === "Recenti") {
    list = await pb.collection("recipes").getList(1, 50, {
      sort: "-created",
    });
  } else {
    list = await pb.collection("recipes").getList(1, 50, {
      filter: `type="${get(homeFilter)}"`,
    });
  }
  return list.items;
});
