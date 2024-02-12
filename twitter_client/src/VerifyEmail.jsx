import React, { useEffect, useState } from "react";
import useQueryParams from "./useQueryParams";
import axios from "axios";

const VerifyEmail = () => {
  const query = useQueryParams();
  const [message, setMessage] = useState("");
  const { token } = query;
  const controller = new AbortController();

  useEffect(() => {
    if (token) {
      axios
        .post(
          "/users/verify-email",
          { email_verify_token: token },
          {
            baseURL: import.meta.env.VITE_API_URL,
            signal: controller.signal,
          }
        )
        .then((res) => {
          setMessage(res.data.message);
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

export default VerifyEmail;
