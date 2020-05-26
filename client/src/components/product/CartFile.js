import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getCart } from "../queries/User";
import PreloaderFile from "../basic/PreloaderFile";
import { Link } from "react-router-dom";
import DeleteCart from "../Buttons/DeleteCart";
import AddOrder from "../Buttons/AddOrder";
const user = JSON.parse(localStorage.getItem("user"));
let total = 0;
let items = [];
const CartFile = () => {
  const { loading, error, data } = useQuery(getCart, {
    variables: { userId: user.id },
  });

  if (error) {
    console.log(error);
  } else if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <PreloaderFile />
      </div>
    );
  } else {
    data.getCart.forEach((i) => {
      items.push(i.id);
      total += i.price;
    });
    return (
      <div className="my-5">
        {data.getCart.length > 0 && (
          <>
            <h6 className="text-muted text-center">
              محصولات موجود در سبد خرید
            </h6>
          </>
        )}

        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-8 mx-auto">
            {data.getCart.length > 0 ? (
              data.getCart.map((item, i) => {
                return (
                  <div className="row border rounded my-5 mx-2" key={i}>
                    <div className="col-3 border-right">
                      <img src={item.image} className="img-fluid" alt="محصول" />
                    </div>
                    <div className="col-3 border-right valign-wrapper">
                      <span className="badge badge-warning mx-auto text-light">
                        {item.price} $
                      </span>
                    </div>
                    <div className="col-3 border-right valign-wrapper">
                      <Link
                        className="text-center mx-auto"
                        to={"/products/" + item.id}
                      >
                        مشخصات
                      </Link>
                    </div>
                    <div className="col-3 valign-wrapper">
                      <DeleteCart item={item} user={user} />
                    </div>
                  </div>
                );
              })
            ) : (
              <h6 className="text-muted text-center">سبد خرید شما خالی است</h6>
            )}
          </div>
        </div>
        {data.getCart.length > 0 && (
          <div className="row my-3">
            <div className="col-6 mx-auto d-flex flex-column justify-content-center">
              <p
                className="text-center badge badge-primary py-2 mx-2"
                style={{ fontSize: "20px" }}
              >
                {total} $
              </p>
              <AddOrder items={items} total={total} />
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default CartFile;
