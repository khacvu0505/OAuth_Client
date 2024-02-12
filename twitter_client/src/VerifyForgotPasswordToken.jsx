import React, { useEffect, useState } from "react";
import useQueryParams from "./useQueryParams";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyForgotPasswordToken = () => {
  const query = useQueryParams();
  const [message, setMessage] = useState("");
  const { token } = query;
  const controller = new AbortController();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .post(
          "/users/verify-forgot-password",
          { forgot_password_token: token },
          {
            baseURL: import.meta.env.VITE_API_URL,
            signal: controller.signal,
          }
        )
        .then((res) => {
          navigate("/forgot-passsword", {
            state: {
              forgot_password_token: token,
            },
          });
          // setMessage(res.data.message);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });
    }
    return () => {
      controller.abort();
    };
  }, [token]);

  return <div>{message}</div>;
};

export default VerifyForgotPasswordToken;
