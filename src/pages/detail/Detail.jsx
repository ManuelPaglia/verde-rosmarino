import React, { useEffect, useState } from "react";
import "./Detail.css";
import {
  Text,
  Spacer,
  Card,
  Badge,
  Col,
  Button,
  Loading,
  Collapse,
} from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUtensilSpoon, FaChevronRight } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import { loadable } from "jotai/utils";
import { useAtom } from "jotai";
import { detailId, recipeById } from "../../shared/store";

function Detail() {
  const { id } = useParams();
  const [detailIdx, setDetailIdx] = useAtom(detailId);
  const [portion, setPortion] = useState(1);
  const recipe = loadable(recipeById);
  const navigate = useNavigate();

  const Ingredient = ({ ing, qta }) => {
    return (
      <div className="ingredient-container">
        <Text style={{ width: "70%" }}>{ing}</Text>
        <Text style={{ flexGrow: 1 }}>{qta}</Text>
        <Button bordered color="success" size="mini">
          <HiPlus style={{ margin: "3px" }} size={15} />
        </Button>
      </div>
    );
  };

  function plus() {
    setPortion(portion + 1);
  }
  function minus() {
    if (portion > 1) {
      setPortion(portion - 1);
    }
  }
  useEffect(() => {
    setDetailIdx(id);
  }, []);

  const RenderRecipe = () => {
    const [value] = useAtom(recipe);
    if (value.state === "hasError") return <Text>{value.error}</Text>;
    if (value.state === "loading") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Loading />
        </div>
      );
    }
    return (
      <div className="detail-container">
        <div className="sticky-area">
          <div className="detail-header">
            <div className="sbc-row">
              <Text h3 css={{ margin: "0" }}>
                {value.data.name}
              </Text>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  light
                  color="white"
                  size="mini"
                  onPress={() => navigate(-1)}
                >
                  <FaChevronRight color="#17c964" />
                </Button>
              </div>
            </div>
          </div>
          <div className="card-detail-image">
            <Card>
              <Card.Header
                css={{
                  position: "absolute",
                  zIndex: 1,
                  bottom: 0,
                  left: "78%",
                }}
              >
                <Badge color="success" css={{ border: 0 }}>
                  <FaUtensilSpoon />
                  <FaUtensilSpoon />
                </Badge>
              </Card.Header>
              <Card.Image
                css={{ opacity: "75%" }}
                src={
                  "https://divine-breeze-8469.fly.dev/api/files/ftwnh1utpfr11aw/" +
                  value.data.id +
                  "/" +
                  value.data.image
                }
                objectFit="cover"
                width="100%"
                height="20vh"
                alt="Card image background"
              />
            </Card>
          </div>
          <Badge css={{ margin: "0.8rem 1.5rem" }} color="success">
            {value.data.type}
          </Badge>
        </div>

        <div className="ingredient-header">
          <Col>
            <Text weight="semibold">Ingredienti</Text>
            <Text weight="hairline" color="grey" size={12}>
              Per quante porzioni?
            </Text>
          </Col>
          <div className="set-portion">
            <Button bordered color="success" size="mini" onPress={minus}>
              <HiMinus style={{ margin: "5px" }} />
            </Button>
            <Spacer />
            <Badge color="success">
              <Text style={{ margin: "0 0.5rem" }}>{portion}</Text>
            </Badge>
            <Spacer />
            <Button bordered color="success" size="mini" onPress={plus}>
              <HiPlus style={{ margin: "5px" }} />
            </Button>
          </div>
        </div>

        <div className="divider"></div>

        <div className="ingredient-list">
          {value.data.ingredients.ingredientList.map((ing, idx) => (
            <Ingredient
              ing={ing.ingredient}
              qta={isNaN(ing.qta) ? ing.qta : ing.qta * portion + " g"}
              key={idx}
            />
          ))}
        </div>
        <div className="divider"></div>
        <div className="desc-header">
          <Text h4 css={{ margin: 0 }}>
            Procedimento
          </Text>
        </div>
        <div className="desc-body">
          {/* <Collapse.Group shadow>
            {value.data.method.stepList.map((step, idx) => (
              <Collapse
                title={
                  <Text color="grey" weight={"bold"}>{`${idx + 1}. ${
                    step.title
                  }`}</Text>
                }
              >
                <Text>
                  <Text>{step.desc}</Text>
                </Text>
              </Collapse>
            ))}
          </Collapse.Group>
          <Spacer y={1} /> */}

          {/*  */}
          <Collapse.Group splitted>
            {value.data.method.stepList.map((step, idx) => (
              <Collapse
                title={
                  <Text color="grey" weight={"bold"}>{`${idx + 1}. ${
                    step.title
                  }`}</Text>
                }
              >
                <Text>
                  <Text>{step.desc}</Text>
                </Text>
              </Collapse>
            ))}
          </Collapse.Group>
          <Spacer y={1} />

          {/*  */}
        </div>

        {/* <div className="recipe-button">
          <Button css={{ width: "100%" }} color="success">
            PROCEDIMENTO
          </Button>
        </div> */}
      </div>
    );
  };

  return (
    <>
      <RenderRecipe />
    </>
  );
}

export default Detail;
