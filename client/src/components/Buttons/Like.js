import React from "react";
import PreloaderFile from "../basic/PreloaderFile";
import { useMutation } from "@apollo/react-hooks";
import { likeProductMutation, getProducts } from "../queries/Product";
const LikeButton = ({ item, user }) => {
  const find = item.likes.find((it) => it.userName === user.userName);
  // use mutation for create comment
  const [likeProduct, { loading }] = useMutation(likeProductMutation, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleLike = () => {
    likeProduct({
      variables: { productId: item.id },
      refetchQueries: [{ query: getProducts }],
    });
  };
  if (loading) {
    return (
      <div className="mt-2">
        <PreloaderFile />
      </div>
    );
  } else {
    return (
      <button
        className={
          find
            ? "btn-med btn-floating mt-2 mb-4"
            : "pulse btn-med red accent-3 btn-floating mt-2 mb-4"
        }
        onClick={handleLike}
      >
        <i className="material-icons">{find ? " thumb_down" : "thumb_up"}</i>
      </button>
    );
  }
};

export default LikeButton;
