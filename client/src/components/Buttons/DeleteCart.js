import React from "react";
import { useMutation } from "@apollo/react-hooks";
import PreloaderFile from "../basic/PreloaderFile";
import { deleteFromCartMutation, getCart } from "../queries/User";
const DeleteCart = ({ item, user }) => {
  const [deleteFromCart, { loading }] = useMutation(deleteFromCartMutation, {
    update(proxy, result) {
      // window.location = "/cart";
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
          deleteFromCart({
            variables: { productId: item.id, userId: user.id },
            refetchQueries: [
              { query: getCart, variables: { userId: user.id } },
            ],
          });
        }}
        className="btn-small pulse btn-floating pink accent-3 mx-auto"
      >
        <i className="material-icons">remove</i>
      </a>
    );
  }
};

export default DeleteCart;
