import React, { useState } from "react";

import { createCommentMutation, getProducts } from "../queries/Product";
import { useMutation } from "@apollo/react-hooks";
import PreloaderFile from "../basic/PreloaderFile";
const CommentForm = ({ id }) => {
  const [body, setbody] = useState("");
  const [createComment, { loading }] = useMutation(createCommentMutation, {
    update(proxy, result) {
      setbody("");
    },
    onError(err) {
      console.log(err);
    },
  });
  const handleSub = async (e) => {
    e.preventDefault();
    await createComment({
      variables: { body, productId: id },
      refetchQueries: [{ query: getProducts }],
    });
  };
  return (
    <form onSubmit={handleSub}>
      <div className=" row">
        <div className="col-3 mr-2">
          {loading ? (
            <div className="mt-3">
              <PreloaderFile />
            </div>
          ) : (
            <input
              className="btn-small pink accent-3 mt-4"
              value="ارسال"
              type="submit"
            />
          )}
        </div>
        <div className="input-field col-8">
          <textarea
            id="icon_prefix2"
            name="body"
            className="materialize-textarea  text-center"
            onChange={(e) => setbody(e.target.value)}
            placeholder="کامنت"
            value={body}
            required
          ></textarea>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
