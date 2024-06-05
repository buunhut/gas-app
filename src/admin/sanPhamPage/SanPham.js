import React from "react";
import SanPhamItem from "./SanPhamItem";
import { useDispatch, useSelector } from "react-redux";
import { postSanPham } from "../../api/postAPI";

const SanPham = ({ danhMucSelected }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);
  const handleTaoSanPham = () => {
    const data = {
      danhMucId: danhMucSelected.danhMucId,
    };
    postSanPham(data, headers, dispatch);
  };
  return (
    <div className="mainContent">
      <div className="product">
        <div className="controller">
          <h5 className="title">Sản phẩm</h5>
          {danhMucSelected && (
            <button className="btn" onClick={handleTaoSanPham}>
              <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </div>
        <div className="productContent">
          {danhMucSelected?.listSanPham?.map((item, index) => {
            return <SanPhamItem key={index} item={item} headers={headers} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SanPham;
