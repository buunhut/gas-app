import React, { useState } from "react";
import { deleteKhachHang } from "../../api/deleteAPI";
import { useDispatch, useSelector } from "react-redux";
import { putKhachHang } from "../../api/putAPI";
import "./khachhang.scss";

const KhachHangItem = ({ item }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);

  const { doiTacId, tenDoiTac, diaChiDoiTac, soDienThoaiDoiTac, viTri } = item;
  const doiTac = {
    doiTacId,
    tenDoiTac,
    diaChiDoiTac,
    soDienThoaiDoiTac,
    viTri,
  };

  const [doiTacSelected, setDoiTacSelected] = useState(null);
  const handleChangeInput = (e, item) => {
    const { className, value } = e.target;
    setDoiTacSelected({
      ...doiTac,
      [className]:
        className === "soDienThoaiDoiTac" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleXoaKhachHang = (item) => {
    const { doiTacId } = item;
    const data = { doiTacId };
    const confirm = window.confirm(
      `Bạn có chắc muốn xoá ${item.tenDoiTac.toUpperCase()} ?`
    );
    if (confirm) {
      deleteKhachHang(data, headers, dispatch);
    } else {
      return;
    }
  };

  const handleSuaKhachHang = () => {
    putKhachHang(doiTacSelected, headers, dispatch);
  };

  return (
    <div className="khachHang">
      <div className="khachHangItem">
        <div className="inputItem mtb5">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="Tên khách hàng"
            className="tenDoiTac"
            value={
              doiTacSelected?.doiTacId === doiTacId
                ? doiTacSelected?.tenDoiTac === null
                  ? ""
                  : doiTacSelected?.tenDoiTac
                : tenDoiTac === null
                ? ""
                : tenDoiTac
            }
            onChange={(e) => handleChangeInput(e, item)}
            onBlur={handleSuaKhachHang}
          />
        </div>
        <div className="inputItem mtb5">
          <i className="fa-solid fa-phone"></i>
          <input
            type="text"
            placeholder="Điện thoại"
            className="soDienThoaiDoiTac"
            value={
              doiTacSelected?.doiTacId === doiTacId
                ? doiTacSelected?.soDienThoaiDoiTac === null
                  ? ""
                  : doiTacSelected?.soDienThoaiDoiTac
                : soDienThoaiDoiTac === null
                ? ""
                : soDienThoaiDoiTac
            }
            // onClick={() => handleClickKhachHang(item)}
            onChange={(e) => handleChangeInput(e, item)}
            onBlur={handleSuaKhachHang}
          />
        </div>
        <div className="inputItem mtb5">
          <i className="fa-solid fa-house-chimney"></i>
          <input
            type="text"
            placeholder="Địa chỉ"
            className="diaChiDoiTac"
            value={
              doiTacSelected?.doiTacId === doiTacId
                ? doiTacSelected?.diaChiDoiTac === null
                  ? ""
                  : doiTacSelected?.diaChiDoiTac
                : diaChiDoiTac === null
                ? ""
                : diaChiDoiTac
            }
            // onClick={() => handleClickKhachHang(item)}
            onChange={(e) => handleChangeInput(e, item)}
            onBlur={handleSuaKhachHang}
          />
        </div>
        <div className="flex aic jcsbw g10">
          <div className="inputItem mtb5">
            <i className="fa-solid fa-location-dot"></i>
            <input
              type="text"
              placeholder="Vị trí"
              className="viTri"
              value={
                doiTacSelected?.doiTacId === doiTacId
                  ? doiTacSelected?.viTri === null
                    ? ""
                    : doiTacSelected?.viTri
                  : viTri === null
                  ? ""
                  : viTri
              }
              // onClick={() => handleClickKhachHang(item)}
              onChange={(e) => handleChangeInput(e, item)}
              onBlur={handleSuaKhachHang}
            />
          </div>
          <i
            className="fa-solid fa-trash-can delete"
            onClick={() => handleXoaKhachHang(item)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default KhachHangItem;
