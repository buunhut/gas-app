import React, { useState } from "react";
import { deleteNhaPhanPhoi } from "../../api/deleteAPI";
import { useDispatch, useSelector } from "react-redux";
import { putNhaPhanPhoi } from "../../api/putAPI";
import "./nhaphanphoi.scss";

const NhaPhanPhoiItem = ({ item }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);
  const { doiTacId, tenDoiTac, diaChiDoiTac, soDienThoaiDoiTac } = item;
  const [doiTacSelected, setDoiTacSelected] = useState(null);

  const handleChangeInput = (e, item) => {
    const { className, value } = e.target;
    setDoiTacSelected({
      doiTacId,
      soDienThoaiDoiTac,
      tenDoiTac,
      diaChiDoiTac,
      [className]:
        className === "soDienThoaiDoiTac" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleXoaNhaPhanPhoi = (item) => {
    const { doiTacId } = item;
    const data = { doiTacId };
    const confirm = window.confirm(
      `Bạn có chắc muốn xoá ${item.tenDoiTac?.toUpperCase()} ?`
    );
    if (confirm) {
      deleteNhaPhanPhoi(data, headers, dispatch);
    } else {
      return;
    }
  };

  const handleSuaNhaPhanPhoi = () => {
    putNhaPhanPhoi(doiTacSelected, headers, dispatch);
  };

  return (
    <div className="nhaPhanPhoi">
      <div className="nhaPhanPhoiItem">
        <div className="inputItem">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="Tên nhà phân phối"
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
            onBlur={handleSuaNhaPhanPhoi}
          />
        </div>
        <div className="inputItem">
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
            onChange={(e) => handleChangeInput(e, item)}
            onBlur={handleSuaNhaPhanPhoi}
          />
        </div>
        <div className="flex aic jcsbw g10">
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
              onChange={(e) => handleChangeInput(e, item)}
              onBlur={handleSuaNhaPhanPhoi}
            />
          </div>
          <i
            className="fa-solid fa-trash-can delete"
            onClick={() => handleXoaNhaPhanPhoi(item)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NhaPhanPhoiItem;
