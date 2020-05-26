import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getOrders } from "../queries/Order";
import OrderItem from "./OrderItem";
import PreloaderFile from "../basic/PreloaderFile";
const OrderFile = () => {
  const { loading, data } = useQuery(getOrders);
  if (loading) {
    return (
      <div className="d-flex my-5 justify-content-center align-items-center">
        <PreloaderFile />
      </div>
    );
  }
  return (
    <div>
      <div className="row my-3">
        <div className="col-12 col-sm-12 col-md-10 col-lg-8 mx-auto my-3">
          <h6 className="text-center text-muted mb-5">سفارش های شما </h6>
          {data.getOrders.length > 0 ? (
            <OrderItem data={data.getOrders} />
          ) : (
            <h6 className="text-center text-muted">هیچ سفارشی ثبت نشده است</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderFile;
