import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const SubscriptionFailure: React.FC  = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/subscribe"); 
  //   }, 5000); 
  // }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "https://vas-fastest-finger.netlify.app";
    }, 8000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold text-red-400">Subscription Failed ❌</h1>
      <p className="mt-2 text-gray-700">Your subscription could not be completed.</p>
      <p className="mt-2 text-gray-700">Redirecting you...</p>
    </div>
  );
};

export default SubscriptionFailure;
