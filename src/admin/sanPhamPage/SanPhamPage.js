import React, { useEffect, useState } from "react";
import "./sanpham.scss";
import { useDispatch, useSelector } from "react-redux";
import LoaiVo from "./LoaiVo";
import DanhMuc from "./DanhMuc";
import { getDanhMuc } from "../../api/getAPI";
import SanPham from "./SanPham";

const SanPhamPage = () => {
  const dispatch = useDispatch();
  const { headers, listDanhMuc } = useSelector((state) => state.dataSlice);

  const [danhMucSelected, setDanhMucSelected] = useState(null);

  const [editDanhMuc, setEditDanhMuc] = useState(null);

  const handleSelectDanhMuc = (item) => {
    setDanhMucSelected(item);
    setEditDanhMuc(item);
  };

  useEffect(() => {
    getDanhMuc(headers, dispatch);
  }, [headers, dispatch]);

  useEffect(() => {
    const index = listDanhMuc?.findIndex(
      (item) => item.danhMucId === danhMucSelected?.danhMucId
    );
    if (index !== -1) {
      setDanhMucSelected(listDanhMuc[index]);
    } else {
      setDanhMucSelected(listDanhMuc[0]);
    }
  }, [listDanhMuc, danhMucSelected?.danhMucId]);
  return (
    <div className="sanPham">
      <LoaiVo />
      <DanhMuc
        handleSelectDanhMuc={handleSelectDanhMuc}
        editDanhMuc={editDanhMuc}
        danhMucSelected={danhMucSelected}
        setDanhMucSelected={setDanhMucSelected}
        setEditDanhMuc={setEditDanhMuc}
      />

      <SanPham danhMucSelected={danhMucSelected} />
    </div>
  );
};

export default SanPhamPage;
