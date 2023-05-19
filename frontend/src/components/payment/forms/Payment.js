import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../constants";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useFetch from "../../../hooks/useFetch";
import LoadingSpinner from "../../ui/LoadingSpinner";

const Payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { fetch, isFetching } = useFetch();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPublicKey = async () => {
      const res = await fetch.get(`${BACKEND_URL}/payment/config`);
      const publicKey = res?.data?.publicKey;
      if (!publicKey) return setError(true);
      setStripePromise(loadStripe(publicKey));
    };
    fetchPublicKey();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch.post(
        `${BACKEND_URL}/payment/create-payment-intent`,
        props.cart
      );
      const clientSecret = res?.data?.clientSecret;
      if (!clientSecret) return setError(true);
      setClientSecret(clientSecret);
    };
    fetchClientSecret();
  }, []);

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {!isFetching && error && (
        <>
          <h2 className="text-danger">
            Fehler bei der Verbindung zum Zahlungsdienstleister
          </h2>
          <h4 className="text-danger">Bitte Vorgang wiederholen</h4>
        </>
      )}
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
