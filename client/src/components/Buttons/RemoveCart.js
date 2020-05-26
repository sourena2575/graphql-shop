import React from "react";
import { useMutation } from "@apollo/react-hooks";
import PreloaderFile from "../basic/PreloaderFile";
import { removeCartMutation, getOrder } from "../queries/Order";
const RemoveCart = ({ productId, orderId }) => {
  const [removeCart, { loading }] = useMutation(removeCartMutation, {
    update(proxy, result) {
      // window.location = `/orders/${orderId}`;
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
      <a
        href="#!"
        onClick={() => {
          removeCart({
            variables: { productId, orderId },
            refetchQueries: [{ query: getOrder, variables: { orderId } }],
          });
        }}
        className="btn-small btn-floating pink accent-3 mx-auto"
      >
        <i className="material-icons">delete</i>
      </a>
    );
  }
};

export default RemoveCart;
