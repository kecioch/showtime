import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

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
      {message && <div id="payment-message">{message}</div>}
      <Button className="float-end" variant="success" type="submit" disabled={isProcessing} id="submit">
        <span id="button-text">
          {isProcessing ? "Bitte warten..." : "Bezahlen"}
        </span>
      </Button>
    </form>
  );
};

export default CheckoutForm;
