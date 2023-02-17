/* eslint-disable react-hooks/rules-of-hooks */
import { pb } from "../../services/PocketBase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Spacer, Container, Col, Loading } from "@nextui-org/react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import AccessHeader from "../../components/accessHeader/AccessHeader";
import VRInput from "../../components/vrInput/VRInput";
import VRPassword from "../../components/vrPassword/VRPassword";
import { validateEmail } from "../../hooks/useValidateMail";

function Signin() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const useValidateMail = validateEmail;
  const data = {
    username: email.split("@")[0],
    email: email,
    emailVisibility: true,
    password: password,
    passwordConfirm: repeatPassword,
    name: name,
  };

  const register = async () => {
    setIsLoading(true);
    try {
      console.log(data);
      await pb.collection("users").create(data);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      toast.error("Qualcosa e andato storto", {
        style: { marginBottom: "10vh" },
      });
    }
  };

  useEffect(() => {
    if (pb.authStore.isValid) {
      navigate("/home");
    }
  });

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="access-scaffold">
        <AccessHeader section={"Crea il tuo account"} />
        <Spacer y={2.5} />
        <Container>
          <Col>
            <VRInput
              labelPlaceholder={"Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Spacer y={1.5} />
            <VRInput
              labelPlaceholder={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Spacer y={1.5} />
            <VRPassword
              labelPlaceholder={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Spacer y={1.5} />
            <VRPassword
              labelPlaceholder={"Ripeti Password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
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
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                disabled={
                  name.length < 4 ||
                  password !== repeatPassword ||
                  password.length < 8 ||
                  !useValidateMail(email)
                }
                css={{ width: "100%" }}
                color="success"
                onPress={() => register()}
              >
                REGISTRATI ORA
              </Button>
            )}
          </Col>
        </Container>
      </div>
    </>
  );
}

export default Signin;
