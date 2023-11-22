import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [params] = useSearchParams();
  console.log("params", params);
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = params.get("accessToken");
    const refresh_token = params.get("accessToken");
    const new_user = params.get("newUser");
    const verify = params.get("verify");

    // Ở đây mình chỉ test UI cho trường hợp login
    // Trường hợp register thì mình sẽ làm sau, dựa vào new_user, verify để biết là user mới hay cũ và đã verify hay chưa
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    navigate("/");
  }, [params]);

  return <div>Login</div>;
}
