import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken === null || refreshToken === null) return;

    sessionStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    login();
    navigate("/");
  }, []);

  return <Loading />;
};

export default GoogleLoginRedirectPage;
