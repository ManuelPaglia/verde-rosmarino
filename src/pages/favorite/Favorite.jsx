import React from "react";
import { useEffect } from "react";
import { pb } from "../../services/PocketBase";
import AppHeader from "../../components/appHeader/AppHeader";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { favoriteList } from "../../shared/store";
import CardFavorite from "../../components/cardFavorite/CardFavorite";

function Favorite() {
  const [favoriteStorage, setFavoriteStorage] = useAtom(favoriteList);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate("/");
    }
  }, []);

  return (
    <div className="app-scaffold">
      <AppHeader title={"I tuoi Preferiti"} />
      <div className="recipe-list">
        {favoriteStorage.length > 0
          ? favoriteStorage.map((fav, idx) => (
              <CardFavorite recipe={fav} key={idx}/>
            ))
          : null}
      </div>
    </div>
  );
}

export default Favorite;
