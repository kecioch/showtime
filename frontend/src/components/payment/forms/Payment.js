import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../constants";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useFetch from "../../../hooks/useFetch";

const Payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { fetch } = useFetch();

  useEffect(() => {
    fetch.get(`${BACKEND_URL}/payment/config`).then((res) => {
      const { publicKey } = res.data;
      setStripePromise(loadStripe(publicKey));
    });
  }, []);

  useEffect(() => {
    console.log("CART PAYMENT", props.cart);
    fetch
      .post(`${BACKEND_URL}/payment/create-payment-intent`, props.cart)
      .then(async (res) => {
        const { clientSecret } = res.data;
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
