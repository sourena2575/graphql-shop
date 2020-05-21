import React from "react";

const MoreInfo = ({ item }) => {
  return (
    <a
      href={"/products/" + item.id}
      className="btn-floating btn-med pulse  blue   font-weight-bold my-2"
    >
      <i className="material-icons black-text" style={{ fontSize: "25px" }}>
        info_outline
      </i>
    </a>
  );
};

export default MoreInfo;
