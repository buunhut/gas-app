import React, { useState } from "react";
import { deleteKhachHang } from "../../api/deleteAPI";
import { useDispatch, useSelector } from "react-redux";
import { putKhachHang } from "../../api/putAPI";
import "./khachhang.scss";
import { speak } from "../AdminPage";

const KhachHangItem = ({ item }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);

  // console.log(item);

  const { doiTacId, tenDoiTac, diaChiDoiTac, soDienThoaiDoiTac, viTri } = item;

  const [doiTacSelected, setDoiTacSelected] = useState(null);
  const handleChangeInput = (e, item) => {
    const { name, value } = e.target;
    setDoiTacSelected({
      doiTacId,
      soDienThoaiDoiTac,
      tenDoiTac,
      diaChiDoiTac,
      viTri,
      [name]: name === "soDienThoaiDoiTac" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleXoaKhachHang = (item) => {
    const { doiTacId } = item;
    const data = { doiTacId };
    const confirm = window.confirm(
      `Bạn có chắc muốn xoá ${
        item.tenDoiTac === null ? "" : item.tenDoiTac?.toUpperCase()
      } ?`
    );
    if (confirm) {
      deleteKhachHang(data, headers, dispatch);
    } else {
      return;
    }
  };

  const handleSuaKhachHang = async () => {
    const data = doiTacSelected;
    if (data !== null) {
      const res = await putKhachHang(doiTacSelected, headers, dispatch);
      if (res === 209) {
        speak("trùng tên rồi, nhập tên khác");
        window.alert("Trùng tên, nhập tên khác");
        setDoiTacSelected(null);
      }
    }
  };

  return (
    <div className="khachHang">
      <div className="khachHangItem">
        <div className="inputItem mtb5">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="Tên khách hàng"
            name="tenDoiTac"
            className="tenDoiTac borderBottom"
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
            name="soDienThoaiDoiTac"
            className="soDienThoaiDoiTac borderBottom"
            value={
              doiTacSelected?.doiTacId === doiTacId
                ? doiTacSelected?.soDienThoaiDoiTac === null
                  ? ""
                  : doiTacSelected?.soDienThoaiDoiTac
                : soDienThoaiDoiTac === null
                ? ""
                : soDienThoaiDoiTac
            }
            onChange={(e) => handleChangeInput(e, item)}
            onBlur={handleSuaKhachHang}
          />
        </div>
        <div className="inputItem mtb5">
          <i className="fa-solid fa-house-chimney"></i>
          <input
            type="text"
            placeholder="Địa chỉ"
            name="diaChiDoiTac"
            className="diaChiDoiTac borderBottom"
            value={
              doiTacSelected?.doiTacId === doiTacId
                ? doiTacSelected?.diaChiDoiTac === null
                  ? ""
                  : doiTacSelected?.diaChiDoiTac
                : diaChiDoiTac === null
                ? ""
                : diaChiDoiTac
            }
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
              name="viTri"
              className="viTri borderBottom"
              value={
                doiTacSelected?.doiTacId === doiTacId
                  ? doiTacSelected?.viTri === null
                    ? ""
                    : doiTacSelected?.viTri
                  : viTri === null
                  ? ""
                  : viTri
              }
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
