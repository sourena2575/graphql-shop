import React, { useState } from "react";
import CommentButton from "../Buttons/Comment";
import CommentForm from "../form/CommentForm";
import LikeButton from "../Buttons/Like";
import AddCart from "../Buttons/AddCart";
import MoreInfo from "../Buttons/MoreInfo";
import GoCart from "../Buttons/GoCart";
import DeleteProduct from "../Buttons/DeleteProduct";
import ProductInfo from "../lists/ProductInfo";
import CommentList from "../lists/CommentList";

const user = JSON.parse(localStorage.getItem("user"));
const ProductCard = ({ item }) => {
  const [commentForm, setcommentForm] = useState(true);

  return (
    <div>
      <div className="card ">
        <div className="card-image waves-effect waves-block waves-light ">
          <img
            className="activator"
            alt="Profile"
            src={item.image}
            style={{ maxHeight: "320px", minHeight: "320px" }}
          />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4 font-weight-bold pb-3 text-center">
            {item.title}
            <i className="material-icons right">more_vert</i>
          </span>
          <p className="text-left h6 font-weight-bold">{item.price} $</p>
        </div>
        <div className="card-reveal">
          <div className="row">
            <div className=" col-2 d-flex flex-column  my-3">
              <AddCart item={item} user={user} />
              <MoreInfo item={item} />
              <GoCart />
              {user && user.email === "sourena@gmail.com" && (
                <DeleteProduct item={item} />
              )}
              <CommentButton
                commentForm={commentForm}
                setcommentForm={setcommentForm}
              />
              <LikeButton item={item} user={user} />
            </div>
            <ProductInfo item={item} />
          </div>
          <div className="row">
            <div className="col-12" hidden={commentForm}>
              <CommentForm id={item.id} />
            </div>
            <div className="col-12">
              {user && (
                <CommentList
                  item={item}
                  user={user}
                  commentForm={commentForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
