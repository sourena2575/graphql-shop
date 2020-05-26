import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getOrder } from "../queries/Order";
import OrderProductList from "./OrderProductList";
import PreloaderFile from "../basic/PreloaderFile";
const OrderDetails = (props) => {
  let id = props.match.params.id;
  const { loading, data } = useQuery(getOrder, {
    variables: { orderId: id },
  });
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <PreloaderFile />
      </div>
    );
  }
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-8 mx-auto">
      <h6
        className="text-muted text-center
      pt-5 pb-5"
      >
        کالاهای موجود در سفارش
      </h6>
      <OrderProductList data={data.getOrder} orderId={id} />
    </div>
  );
};

export default OrderDetails;
