import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../constants";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const Payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/payment/config`).then(async (res) => {
      const { publicKey } = await res.json();
      setStripePromise(loadStripe(publicKey));
    });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/payment/create-payment-intent`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (res) => {
      const { clientSecret } = await res.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
