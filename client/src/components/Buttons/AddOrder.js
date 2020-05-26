import React from "react";
import { useMutation } from "@apollo/react-hooks";
import PreloaderFile from "../basic/PreloaderFile";
import { addOrderMutation } from "../queries/Order";

const AddOrder = ({ items, total }) => {
  const [addOrder, { loading }] = useMutation(addOrderMutation, {
    update() {
      window.location = "/orders";
    },
    onError(err) {
      console.log(err);
    },
  });
  if (loading) {
    return (
      <div className="my-3 d-flex justify-content-center align-items-center">
        <PreloaderFile />
      </div>
    );
  } else {
    return (
      <button
        className=" btn-large teal darken-3 mx-auto my-3 white-text "
        onClick={() => {
          addOrder({
            variables: { products: items, price: JSON.parse(total) },
          });
        }}
      >
        ثبت سفارش
      </button>
    );
  }
};

export default AddOrder;
