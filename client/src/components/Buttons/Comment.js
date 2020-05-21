import React, { useContext } from "react";
import { ContextBase } from "../context/ContextProvider";
const CommentButton = () => {
  const { dispatch } = useContext(ContextBase);

  return (
    <button
      className=" pulse btn-med indigo darken-1 btn-floating my-2"
      onClick={() => dispatch({ type: "COMMENT_FORM" })}
    >
      <i className="material-icons">comment</i>
    </button>
  );
};

export default CommentButton;
