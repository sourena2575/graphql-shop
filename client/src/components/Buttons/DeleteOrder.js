import React from "react";
import { useMutation } from "@apollo/react-hooks";
import PreloaderFile from "../basic/PreloaderFile";
import { deleteOrderMutation, getOrders } from "../queries/Order";
const DeleteOrder = ({ orderId }) => {
  const [deleteOrder, { loading }] = useMutation(deleteOrderMutation, {
    update(proxy, result) {
      //window.location = "/cart";
    },
    onError(er) {
      console.log(er);
    },
  });
  if (loading) {
    return (
      <div className=" mx-auto">
        <PreloaderFile />
      </div>
    );
  } else {
    return (
      <i
        className="material-icons  pink-text accent-4"
        onClick={() => {
          deleteOrder({
            variables: { orderId: orderId },
            refetchQueries: [{ query: getOrders }],
          });
        }}
      >
        delete
      </i>
    );
  }
};

export default DeleteOrder;
