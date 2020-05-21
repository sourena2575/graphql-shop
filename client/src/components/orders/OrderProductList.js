import React from "react";
import { Link } from "react-router-dom";
import RemoveCart from "../Buttons/RemoveCart";

const OrderProductList = ({ data, orderId }) => {
  return (
    <>
      {data.map((item, i) => {
        return (
          <div className="row border rounded my-3 mx-2" key={i}>
            <div className="col-3 border-right">
              <img src={item.image} className="img-fluid" alt="محصول" />
            </div>
            <div className="col-3 border-right valign-wrapper">
              <p className="badge badge-info mx-auto text-light">
                {item.price} $
              </p>
            </div>
            <div className="col-3 border-right valign-wrapper">
              <Link className="text-center mx-auto" to={"/products/" + item.id}>
                مشخصات
              </Link>
            </div>
            <div className="col-3 valign-wrapper">
              <RemoveCart productId={item.id} orderId={orderId} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderProductList;
