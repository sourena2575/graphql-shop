import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { addToCartMutation, getCart } from "../queries/User";
import PreloaderFile from "../basic/PreloaderFile";

const AddCart = ({ item, user }) => {
  const { data } = useQuery(getCart, {
    variables: { userId: user.id },
  });
  const [addToCart, { loading }] = useMutation(addToCartMutation, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
  });
  if (loading) {
    return (
      <div className="mt-5 mb-2">
        <PreloaderFile />
      </div>
    );
  } else {
    return (
      <button
        className="btn-floating btn-med green accent-3 pulse mt-5 mb-2 "
        onClick={() => {
          addToCart({
            variables: { productId: item.id, userId: user.id },
            refetchQueries: [
              { query: getCart, variables: { userId: user.id } },
            ],
          });
        }}
        disabled={data && data.getCart.find((it) => it.id === item.id)}
      >
        <i className="material-icons black-text" style={{ fontSize: "25px" }}>
          add
        </i>
      </button>
    );
  }
};

export default AddCart;
