/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { pb, authService } from "../../services/PocketBase";
import { useNavigate, Link } from "react-router-dom";
import {
  Spacer,
  Text,
  Col,
  Button,
  Container,
  Loading,
} from "@nextui-org/react";
import VRInput from "../../components/vrInput/VRInput";
import VRPassword from "../../components/vrPassword/VRPassword";
import AccessHeader from "../../components/accessHeader/AccessHeader";
import { Toaster, toast } from "react-hot-toast";
import { validateEmail } from "../../hooks/useValidateMail";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const useValidateMail = validateEmail;

  function login() {
    setIsLoading(true);
    authService
      .login(email, password)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          navigate("/home");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Email o password errate", {
          style: { marginBottom: "12vh" },
        });
      });
  }

  useEffect(() => {
    if (pb.authStore.isValid) {
      navigate("/home");
    }
  });

  return (
    <>
      <div className="access-scaffold">
        <Toaster position="bottom-center" reverseOrder={false} />
        <AccessHeader section={"Accedi al tuo account"} />
        <Spacer y={2.5} />
        <Container>
          <Col>
            <VRInput
              labelPlaceholder={"Mail"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Spacer y={1.5} />
            <VRPassword
              labelPlaceholder={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Container>
        <Container
          css={{
            flexGrow: "1",
            display: "flex",
            alignItems: "flex-end",
            padding: "30px",
          }}
        >
          <Col align="center">
            <Text color="white" size={15} css={{ padding: "10px" }}>
              Non hai un account? <Link to="/signin"> Registrati</Link>
            </Text>
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                css={{ width: "100%" }}
                color="success"
                onPress={() => login()}
                disabled={!useValidateMail(email) || password.length < 8}
              >
                ACCEDI
              </Button>
            )}
          </Col>
        </Container>
      </div>
    </>
  );
}

export default Login;
