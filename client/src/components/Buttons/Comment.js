import React from "react";

const CommentButton = ({ setcommentForm, commentForm }) => {
  return (
    <button
      className=" pulse btn-med indigo darken-1 btn-floating my-2"
      onClick={() => setcommentForm(!commentForm)}
    >
      <i className="material-icons">comment</i>
    </button>
  );
};

export default CommentButton;
