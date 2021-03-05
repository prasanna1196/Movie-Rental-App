import { IconButton, Typography } from "@material-ui/core";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Payments = () => {
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 Emaily credits"
      amount={2000}
      token={async (token) => await axios.post("/api/stripe/2000", token)}
      stripeKey={"some key"}
    >
      <IconButton>
        <Typography color="secondary">Add credits</Typography>
      </IconButton>
    </StripeCheckout>
  );
};

export default Payments;
