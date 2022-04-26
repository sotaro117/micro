import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

function OrderShow({ order, currentUser }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();

    const timerId = setInterval(findTimeLeft(), 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <h2>Order expired</h2>;
  }

  return (
    <React.Fragment>
      <div>{timeLeft} senconds until order expires</div>
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey='pk_test_51KsIRmJKATVIyvXa4OTKH80i3QKESGsYaNg0MglW3RIKVflwifBCLb16njDFn1zuTCo92ZPJXPMmWT1fhc4me91w00BoxcsaaZ'
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </React.Fragment>
  );
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
