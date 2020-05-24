import React from "react";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import { deleteCommentMutattion, getProducts } from "../queries/Product";
import PreloaderFile from "../basic/PreloaderFile";
const CommentList = ({ item, user, commentForm }) => {
  const [deleteComment, { loading }] = useMutation(deleteCommentMutattion, {
    update(proxy, result) {
      console.log(result);
    },
    onError(er) {
      console.log(er);
    },
  });
  return (
    <div className="" hidden={commentForm}>
      {item.comments.map((it) => {
        return (
          <div className=" mx-auto mt-3 border-bottom" key={it.id}>
            <div className="d-flex flex-row justify-content-between">
              <div className="col-2 left">
                {it.userName === user.userName &&
                  (!loading ? (
                    <button
                      className="btn-floating btn-small red"
                      onClick={() =>
                        deleteComment({
                          variables: { productId: item.id, commentId: it.id },
                          refetchQueries: [{ query: getProducts }],
                        })
                      }
                    >
                      <i className="material-icons">remove</i>
                    </button>
                  ) : (
                    <PreloaderFile />
                  ))}
              </div>
              <div className="col-10 right">
                <p
                  className="text-right right right-align"
                  style={{ fontSize: "12px" }}
                >
                  {it.body}
                </p>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between mt-1">
              <p className="text-left pb-2" style={{ fontSize: "7px" }}>
                {moment(it.createdAt).fromNow()}
              </p>
              <p className="text-left text-info" style={{ fontSize: "9px" }}>
                {it.userName}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
