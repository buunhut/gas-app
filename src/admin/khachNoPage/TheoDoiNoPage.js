import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TheoDoiNo from "./TheoDoiNo";
import { getKhachHangNo, getLoaiVo } from "../../api/getAPI";

const TheoDoiNoPage = () => {
  const dispatch = useDispatch();
  const { headers, listKhachHangNo } = useSelector((state) => state.dataSlice);

  useEffect(() => {
    getKhachHangNo(headers, dispatch);
    getLoaiVo(headers, dispatch);
  }, [headers, dispatch]);

  return <TheoDoiNo listData={listKhachHangNo} titlePage={"Khách hàng nợ"} />;
};

export default TheoDoiNoPage;
