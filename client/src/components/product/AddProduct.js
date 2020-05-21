import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { createProductMutation, getProducts } from "../queries/Product";
import PreloaderFile from "../basic/PreloaderFile";
const AddProduct = (props) => {
  const [createProduct, { loading }] = useMutation(createProductMutation, {
    update(proxy, result) {
      props.history.push("/products");
    },
    onError(er) {
      console.log(er.graphQLErrors);
    },
  });
  const handleSub = async (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const company = e.target.elements.company.value;
    const color = e.target.elements.color.value;
    const price = JSON.parse(e.target.elements.price.value);
    const size = e.target.elements.size.value;
    const number = JSON.parse(e.target.elements.number.value);
    const desc = e.target.elements.desc.value;
    const image = e.target.elements.image.value;

    await createProduct({
      variables: { image, price, color, company, size, number, desc, title },
      refetchQueries: [{ query: getProducts }],
    });
  };
  return (
    <div className="bg-dark py-5">
      <div className="container my-5 ">
        <div className="row my-5">
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-6 mx-auto">
            <h6 className="text-muted text-center pb-5">
              مشخصات محصول را وارد کنید
            </h6>
            <form onSubmit={handleSub}>
              <div className="row">
                <div className="col-6">
                  <input
                    name="title"
                    placeholder="عنوان محصول"
                    className=" text-center text-light"
                    type="text"
                  />
                </div>
                <div className="col-6">
                  <input
                    name="company"
                    placeholder=" شرکت تولید کننده"
                    className=" text-center text-light"
                    type="text"
                  />
                </div>
                <div className="col-6 my-5">
                  <input
                    name="color"
                    placeholder=" رنگ محصول"
                    className=" text-center text-light"
                    type="text"
                  />
                </div>
                <div className="col-6">
                  <input
                    name="price"
                    placeholder="قیمت محصول"
                    className=" text-center my-5 text-light"
                    type="number"
                  />
                </div>
                <div className="col-6">
                  <input
                    name="size"
                    placeholder="اندازه محصول"
                    className=" text-center mb-5 text-light"
                    type="text"
                  />
                </div>
                <div className="col-6">
                  <input
                    name="number"
                    placeholder="تعداد در انبار"
                    className=" text-center mb-5 text-light"
                    type="number"
                  />
                </div>
                <div className="col-12 mx-auto">
                  <textarea
                    className="materialize-textarea text-center mb-5 text-light"
                    name="image"
                    placeholder="یو آر ال عکس محصول"
                  ></textarea>
                </div>
                <div className="col-12 mx-auto">
                  <textarea
                    className="materialize-textarea text-center mb-5 text-light"
                    name="desc"
                    placeholder="توضیحات محصول"
                  ></textarea>
                </div>
                <div className="col-6 mr-auto my-4">
                  {loading ? (
                    <PreloaderFile />
                  ) : (
                    <button
                      type="submit"
                      className="btn-small pink accent-3 pulse"
                    >
                      تایید
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
