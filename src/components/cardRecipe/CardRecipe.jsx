import React, { useState } from "react";
import "./CardRecipe.css";
import { Card, Text, Button } from "@nextui-org/react";
import { AiFillStar } from "react-icons/ai";
import { FaHeart, FaStopwatch } from "react-icons/fa";
import { useEffect } from "react";
import { pb } from "../../services/PocketBase";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { favoriteList } from "../../shared/store";

function CardRecipe({ recipe }) {
  async function getuserName() {
    pb.autoCancellation(false);
    const record = await pb
      .collection("users")
      .getFirstListItem(`id="${recipe.author}"`);

    setUser(record);
  }

  const [favoriteStorage, setFavoriteStorage] = useAtom(favoriteList);

  function toggleFavorite() {
    if (favoriteStorage.length > 0) {
      let obj = {
        image: recipe.image,
        rating: recipe.rating,
        name: recipe.name,
        duration: recipe.duration,
        author: user.name,
        id: recipe.id,
      };

      if (favoriteStorage.some((e) => e.id === recipe.id)) {
        let filtered = favoriteStorage.filter(function (el) {
          return el.id !== obj.id;
        });
        setFavoriteStorage(filtered);
      } else {
        setFavoriteStorage([...favoriteStorage, obj]);
      }
    } else {
      setFavoriteStorage([
        ...favoriteStorage,
        {
          image: recipe.image,
          rating: recipe.rating,
          name: recipe.name,
          duration: recipe.duration,
          author: user.name,
          id: recipe.id,
        },
      ]);
    }
  }

  useEffect(() => {
    getuserName();
  }, []);

  const [user, setUser] = useState("");
  return (
    <div className="card-container">
      {user === "" ? null : (
        <Card variant="bordered" isPressable>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 0 }}>
            <div className="row">
              <Text size={20} weight="bold">
                {user.name}
              </Text>
              <div className="rating">
                <AiFillStar color="#fcba03" size={22} />
                <Text h4 color="white" css={{ margin: "0px" }}>
                  {recipe.rating}
                </Text>
              </div>
            </div>
          </Card.Header>
          <Link to={"/detail/" + recipe.id}>
            <Card.Image
              css={{ opacity: "75%" }}
              src={
                "https://divine-breeze-8469.fly.dev/api/files/ftwnh1utpfr11aw/" +
                recipe.id +
                "/" +
                recipe.image
              }
              objectFit="cover"
              width="100%"
              height="26vh"
              alt="Card image background"
            />
          </Link>

          <Card.Footer css={{ flexDirection: "column" }}>
            <div className="row">
              <Text weight="bold" size={20}>
                {recipe.name}
              </Text>

              <Button light color="white" size="mini" onPress={toggleFavorite}>
                <FaHeart
                  style={{ margin: "6px" }}
                  color={
                    favoriteStorage.some((e) => e.id === recipe.id)
                      ? "red"
                      : "white"
                  }
                  size={22}
                />
              </Button>
            </div>
            <div className="row">
              <div className="rating">
                <FaStopwatch color="grey" />
                <Text
                  weight="ligth"
                  size={16}
                  color="grey"
                  css={{ marginLeft: "1vw" }}
                >
                  {recipe.duration} minuti
                </Text>
              </div>
            </div>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
}

export default CardRecipe;
