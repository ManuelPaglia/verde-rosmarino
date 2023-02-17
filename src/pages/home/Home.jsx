import React from "react";
import { Text, Input, Badge, Loading } from "@nextui-org/react";
import { pb } from "../../services/PocketBase";
import "./Home.css";

import { BiSearch } from "react-icons/bi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardRecipe from "../../components/cardRecipe/CardRecipe";
import AppHeader from "../../components/appHeader/AppHeader";

import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import {  homeFilter, recipesByType } from "../../shared/store";
import { categories } from "../../utils/const";

function Home() {
  const navigate = useNavigate();
  const recipes = loadable(recipesByType);
  const [category, setCategory] = useAtom(homeFilter);

  const listItems = categories.map((item, idx) => (
    <Badge
      key={idx}
      size="md"
      css={{ margin: "0.3rem" }}
      color={category === categories[idx] ? "success" : "default"}
      onClick={() => {
        setCategory(categories[idx]);
      }}
    >
      {item}
    </Badge>
  ));

  const RecipeList = () => {
    const [value] = useAtom(recipes);
    if (value.state === "hasError") return <Text>{value.error}</Text>;
    if (value.state === "loading") {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      );
    }
    return value.data.map((recipe) => (
      <CardRecipe recipe={recipe} key={recipe.id} />
    ));
  };




  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="app-scaffold scroll">
        <AppHeader
          subtitle={"Cosa vuoi cucinare oggi?"}
          title={"Ciao, " + pb.authStore.model.name}
        />
        <div className="input-search">
          <Input
            css={{ width: "100%" }}
            placeholder="Ricerca ricette"
            contentRight={<BiSearch size={20} />}
          />
        </div>
        <div className="filter">
          <Text h4 css={{ marginLeft: "1.5rem" }}>
            Categorie
          </Text>
          <div className="categories-list">{listItems}</div>
        </div>
        <div className="recipe-list">
          <RecipeList />
        </div>
      </div>
    </>
  );
}

export default Home;
