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
    console.log("CART PAYMENT", props.cart);
    fetch(`${BACKEND_URL}/payment/create-payment-intent`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.cart),
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
