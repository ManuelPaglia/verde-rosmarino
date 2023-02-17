import React from "react";
import { Button, Switch } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { pb, authService } from "../../services/PocketBase";

function User() {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate("/login");
  };
  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate("/");
    }
  });
  return (
    <div className="app-scaffold">
      <Button onPress={() => logout()}>logout</Button>
      <Switch/>
    </div>
  );
}

export default User;
