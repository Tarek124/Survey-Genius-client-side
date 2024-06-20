import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_pk);

const Payment = () => {
  const { userRole } = useAuth();
  if (userRole !== "user") {
    return <Navigate to="/" />;
  }
  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <Elements stripe={stripePromise}>
        <CheckOut />
      </Elements>
    </div>
  );
};

export default Payment;
