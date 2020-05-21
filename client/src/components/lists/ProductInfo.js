import React from "react";

const ProductInfo = ({ item }) => {
  return (
    <div className="col-10 ml-auto">
      <span className="card-title grey-text text-darken-4 text-center">
        {item.title}
        <i className="material-icons right">close</i>
      </span>
      <p className="text-right h6 pt-2">:شرکت</p>
      <p className="text-right px-3">{item.company}</p>
      <p className="text-right h6 pt-1">:رنگ</p>
      <p className="text-right px-3">{item.color}</p>
      <p className="text-right h6 pt-1">:اندازه</p>
      <p className="text-right px-3">{item.size}</p>
      <p className="text-right h6 pt-1">:تعداد</p>
      <p className="text-right px-3">{item.number}</p>
      <p className="text-right h6 pt-1">:توضیحات</p>
      <p className="text-right px-3">{item.desc}</p>
      <p className="text-right h6 pt-1">:قیمت</p>
      <p className="text-right px-3 h5 py-1">{item.price} $</p>
    </div>
  );
};

export default ProductInfo;
