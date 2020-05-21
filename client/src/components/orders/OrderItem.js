import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DeleteOrder from "../Buttons/DeleteOrder";
const OrderItem = ({ data }) => {
  return (
    <>
      {data.map((item, i) => {
        return (
          <div className="row border rounded bg-light mx-3 my-3" key={i}>
            <div className="col-3 border-right valign-wrapper d-flex flex-column">
              <p className="text-center pt-2">قیمت محصولات</p>
              <p className="text-center badge badge-primary px-2 py-2">
                {item.price} $
              </p>
            </div>
            <div className="col-3 border-right d-flex justify-content-center align-items-center">
              <Link
                to={"/orders/" + item.id}
                className="text-center py-2"
                style={{ fontSize: "12px" }}
              >
                {moment(item.createdAt).fromNow()}
              </Link>
            </div>
            <div className="col-4 border-right valign-wrapper d-flex flex-column">
              <p className="text-center pt-2">وضعیت سفارش</p>
              <div className="d-flex flex-row">
                <i className="material-icons mx-auto yellow-text darken-2">
                  shopping_cart
                </i>
                <i className="material-icons mx-auto green-text accent-3">
                  beenhere
                </i>
                <i className="material-icons mx-auto pink-text accent-3">
                  airplanemode_inactive
                </i>
                <i className="material-icons mx-auto blue-text accent-2 ">
                  airport_shuttle
                </i>
              </div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center ">
              <DeleteOrder orderId={item.id} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderItem;
