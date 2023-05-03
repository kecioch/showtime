import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import LoadingButton from "../../ui/LoadingButton";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/ticketshop/payment/completion`,
      },
    });

    if (error) setMessage(error.message);

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <hr />
      {message && <div id="payment-message" className="text-danger mb-3">{message}</div>}
      <LoadingButton
        className="w-100"
        isLoading={isProcessing}
        variant="success"
        type="submit"
        id="submit"
      >
        Bezahlen
      </LoadingButton>
    </form>
  );
};

export default CheckoutForm;
