import { Badge, IconButton } from "@material-ui/core";
import { MonetizationOn } from "@material-ui/icons";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const Payments = () => {
  return (
    <StripeCheckout
      name="Emaily"
      description="100 for 100 Nutflix credits"
      amount={500}
      token={(token) => this.props.handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <IconButton>
        <MonetizationOn style={{ color: "#ADFF2F" }} />
      </IconButton>
    </StripeCheckout>
  );
};

export default Payments;
