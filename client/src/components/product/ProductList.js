import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getProducts } from "../queries/Product";
import PreloaderFile from "../basic/PreloaderFile";
import ProductCard from "./ProductCard";
const ProductList = () => {
  const { loading, error, data } = useQuery(getProducts);

  if (error) {
    console.log(error);
  } else if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <PreloaderFile />
      </div>
    );
  } else {
    return (
      <div className="container my-5">
        <div className="row my-5">
          {data.getProducts.map((item) => {
            return (
              <div
                className="col-10 col-sm-10 col-md-6 col-lg-4  mx-auto"
                key={item.id}
              >
                <ProductCard item={item} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default ProductList;
