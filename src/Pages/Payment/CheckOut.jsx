import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaGoogle, FaPaypal } from "react-icons/fa";
import useSwal from "../../hooks/useSwal";

const CheckOut = () => {
  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const { swalErr } = useSwal();
  const stripe = useStripe();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const price = 14.99;

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data);
    });
  }, [axiosSecure]);

  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment method error", error);
      setErr(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setErr("");
    }
    // confirm the payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous@gmail.com",
            name: user.displayName || "Anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
      swalErr(confirmError.message);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        console.log(paymentIntent.id, transactionId);
        // now save the payment in the database
        const payment = {
          email: user.email,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        const res = await axiosSecure.post("/payment", payment);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Thank you for your payment",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate("/");
      }
    }
  };

  return (
    <div className="pt-10 px-4">
      <h1 className="lg:text-5xl text-4xl font-semibold lg:w-1/2 tracking-wide">
        Optimize your life with{" "}
        <span className="text-yellow-500">Survey Genius Pro</span>
      </h1>

      <form className="mt-8 lg:flex gap-8" onSubmit={handleSubmit}>
        <div className="lg:w-2/3 rounded-md shadow-md p-6">
          <h1 className="text-xl font-semibold mb-4">Payment Details</h1>
          <div className="flex gap-2 my-4">
            <button className="p-3 flex items-center justify-center gap-1 w-1/2 rounded-md shadow">
              <FaPaypal /> Paypal
            </button>
            <button className="p-3 flex items-center justify-center gap-1 w-1/2  rounded-md shadow bg-black text-white">
              <FaGoogle />
              Pay
            </button>
          </div>
          <div className="divider text-slate-400 py-6">or pay by card</div>
          <input
            type="text"
            value={user?.displayName}
            placeholder="Type here"
            className="input input-bordered w-full  mb-6"
            disabled
          />
          <CardElement
            className="rounded-md border p-4 w-full"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <p className="text-red-600 py-2">{err}</p>
        </div>
        <div className="rounded shadow-md lg:my-0 my-4 lg:w-1/3 bg-[#efece73a] p-6">
          <div>
            <h3 className="text-xl font-semibold">Monthly Plan</h3>
            <p className="text-slate-400">$14.99/month</p>
          </div>
          <div className="flex justify-between mt-5">
            <h1>Subtotal</h1>
            <p>${price}</p>
          </div>
          <div className="divider  my-2"></div>
          <div className="flex justify-between ">
            <h1>Billed Now</h1>
            <p>$0.00</p>
          </div>
          <button
            type="submit"
            className="btn  w-full bg-yellow-500 text-white my-4"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          {transactionId && (
            <p className="text-green-500">Your transactionId {transactionId}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckOut;

{
  /*  */
}
