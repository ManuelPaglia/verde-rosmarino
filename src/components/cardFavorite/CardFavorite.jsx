import React from "react";
import { Link } from "react-router-dom";
import "./CardFavorite.css";
import { Card, Text, Button } from "@nextui-org/react";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useAtom } from "jotai";
import { favoriteList } from "../../shared/store";

function CardFavorite({ recipe }) {
  const [favoriteStorage, setFavoriteStorage] = useAtom(favoriteList);

  function toggleFavorite() {
    if (favoriteStorage.length > 0) {
      let obj = {
        image: recipe.image,
        rating: recipe.rating,
        name: recipe.name,
        duration: recipe.duration,
        author: recipe.author,
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
          author: recipe.author,
          id: recipe.id,
        },
      ]);
    }
  }

  return (
    <div className="card-container">
      <Card variant="bordered" isPressable>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 0 }}>
          <div className="row">
            <Text size={20} weight="bold">
              {recipe.author}
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
            height="18vh"
            alt="Card image background"
          />
        </Link>
        <Card.Footer css={{ position: "absolute", zIndex: 1, bottom: 0 }}>
          <div className="row">
            <Text size={20} weight="bold">
              {recipe.name}
            </Text>
            <div className="rating">
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
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default CardFavorite;
