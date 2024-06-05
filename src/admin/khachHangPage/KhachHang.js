import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KhachHangItem from "./KhachHangItem";
import { postKhachHang, postTimKiemKhachHang } from "../../api/postAPI";
import { getKhachHang } from "../../api/getAPI";

// export const handleTimKhachHang = (e, headers, dispatch) => {
//   const keyword = e.target.value.trim();
//   const data = { keyword };
//   postTimKiemKhachHang(data, headers, dispatch);
// };

const KhachHang = () => {
  const dispatch = useDispatch();
  const { headers, listKhachHang } = useSelector((state) => state.dataSlice);

  const handleTaoKhachHang = () => {
    postKhachHang(headers, dispatch);
  };

  const handleTimKhachHang = (e, headers, dispatch) => {
    const keyword = e.target.value.trim();
    const data = { keyword };
    postTimKiemKhachHang(data, headers, dispatch);
  };

  useEffect(() => {
    getKhachHang(headers, dispatch);
  }, []);
  return (
    <div>
      <h3 className="mtb10 tac">Danh sách khách hàng</h3>
      <div className="flex aic">
        <button className="btn ml10" onClick={handleTaoKhachHang}>
          <i className="fa-solid fa-user-plus"></i>
        </button>
        <div className="inputItem mr10 ml10">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className="timKiem"
            type="text"
            placeholder="Tìm khách hàng..."
            onChange={(e) => handleTimKhachHang(e, headers, dispatch)}
          />
        </div>
      </div>
      {listKhachHang?.map((item, index) => {
        return <KhachHangItem key={index} item={item} />;
      })}
    </div>
  );
};

export default KhachHang;
