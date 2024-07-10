import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef } from "react";
import { useCreateMyUser } from "../api/MyUserApi";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);
  useEffect(() => {
    console.log("USER", user);
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      console.log(" Ya deberia haber creado el usuario", user.sub, user.email);
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);
  return <>Loading...</>;
};

export default AuthCallbackPage;
