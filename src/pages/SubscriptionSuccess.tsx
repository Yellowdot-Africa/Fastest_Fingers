import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const SubscriptionSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          "https://fastestfingers.runasp.net/api/FastestFingers/Authorization/Login",
          {
            username: "games_telecel_gh_fastest_finger",
            password: "password",
          }
        );

        if (response.data.isSuccessful) {
          const newToken = response.data.data.jwtToken;
          const tokenExpiry = response.data.data.tokenExpiry * 1000;

          if (newToken) {
            setToken(newToken);
            sessionStorage.setItem("token", newToken);
            sessionStorage.setItem(
              "tokenExpirationTime",
              tokenExpiry.toString()
            );
          }
        } else {
          console.error("Login failed:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch token after subscription:", error);
      }
    };

    fetchToken();

    setTimeout(() => {
      navigate("/");
    }, 8000);
  }, [navigate, setToken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold text-teal">
        Subscription Successful! ✅
      </h1>
      <p className="mt-2 text-gray-700">You have successfully subscribed.</p>
      <p className="mt-2 text-gray-700">Redirecting...</p>
    </div>
  );
};

export default SubscriptionSuccess;
