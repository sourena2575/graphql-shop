import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { deleteProductMutation, getProducts } from "../queries/Product";
import PreloaderFile from "../basic/PreloaderFile";
const DeleteProduct = ({ item }) => {
  const [deleteProuct, { loading }] = useMutation(deleteProductMutation, {
    update(proxy, result) {},
    onError(er) {
      console.log(er);
    },
  });
  if (loading) {
    return (
      <div className="mt-2">
        <PreloaderFile />
      </div>
    );
  } else {
    return (
      <button
        className=" pulse btn-med pink accent-3 btn-floating my-2"
        onClick={() => {
          deleteProuct({
            variables: { productId: item.id },
            refetchQueries: [{ query: getProducts }],
          });
        }}
      >
        <i className="material-icons">delete</i>
      </button>
    );
  }
};

export default DeleteProduct;
