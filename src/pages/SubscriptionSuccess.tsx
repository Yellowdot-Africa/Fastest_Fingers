import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionSuccess: React.FC  = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/"); 
    }, 3000); 
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold text-teal">Subscription Successful! ✅</h1>
      <p className="mt-2 text-gray-700">You have successfully subscribed.</p>
      <p className="mt-2 text-gray-700">Redirecting...</p>
    </div>
  );
};

export default SubscriptionSuccess;
