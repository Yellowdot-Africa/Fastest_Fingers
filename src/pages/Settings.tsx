import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { unsubscribeUser, checkSubscriptionStatus } from "../api/apiService";

const Settings: React.FC = () => {
  const { msisdn, setIsSubscribed, logout } = useAuth();
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<null | {
    isActive: boolean;
  }>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!msisdn) return;
      try {
        const result = await checkSubscriptionStatus(msisdn);
        if (result.isSuccessful) {
          setSubscriptionStatus(result.data);
        } else {
          setSubscriptionStatus({ isActive: false });
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
        setSubscriptionStatus({ isActive: false });
      }
    };

    fetchStatus();
  }, [msisdn]);

  const handleUnsubscribe = async (msisdn?: string) => {
    if (!msisdn) {
      logout();
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    try {
      const result = await unsubscribeUser(msisdn);

      if (result.isSuccessful) {
        if (result.message.includes("Subscription successfully canceled")) {
          setResponseMessage(result.message || "Successfully unsubscribed.");
          setIsError(false);
          setIsSubscribed(false);
          sessionStorage.setItem("isSubscribed", "false");

          setTimeout(() => {
            window.location.href =
              "https://vas-fastest-finger-subscribe.netlify.app/";
          }, 1000);
        }
      } else {
        setResponseMessage(
          result.message || "Subscription could not be found."
        );
        setIsError(true);
      }
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      setResponseMessage(errorMessage);
      setIsError(true);
    }
    setTimeout(() => setResponseMessage(""), 5000);
  };

  return (
    <div>
      <div className="md:hidden flex flex-col items-center my-4">
        <img src="icons/settings-icon.svg" alt="settings" className="h-5" />
        <h1 className="text-lg">Settings</h1>
      </div>

      <div className="max-w-3xl md:mx-auto py-6 pb-40 rounded-lg bg-[#F9F9F9] shadow-custom my-8 md:my-16 mx-4">
        <div className="md:w-3/5 mx-auto px-4 md:px-0">
          <div className="flex items-center gap-3">
            <img src="/icons/ph_film-script-bold.svg" alt="history" />
            <span className="font-bold">Subscription Status</span>
          </div>

          <div className="text-lg text-justify mt-4">
            {subscriptionStatus === null ? (
              <p>Checking subscription...</p>
            ) : (
              <p className="text-[16px]">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    subscriptionStatus.isActive
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {subscriptionStatus.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            )}
            {/* <p className="mt-2">
              <strong>Offer Type:</strong> GH¢0.50/day
            </p> */}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-[#007880] text-white px-4 py-2 rounded-lg font-bold"
            onClick={() => handleUnsubscribe(msisdn)}
          >
            Unsubscribe from Service
          </button>
        </div>

        {responseMessage && (
          <p
            className={`mt-2 p-2 rounded text-center ${
              isError
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Settings;
