import React, { useState } from "react";
import { deleteNhaPhanPhoi } from "../../api/deleteAPI";
import { useDispatch, useSelector } from "react-redux";
import { putNhaPhanPhoi } from "../../api/putAPI";
import "./nhaphanphoi.scss";
import { speak } from "../AdminPage";

const NhaPhanPhoiItem = ({ item }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);
  const { doiTacId, tenDoiTac, diaChiDoiTac, soDienThoaiDoiTac } = item;
  const [doiTacSelected, setDoiTacSelected] = useState(null);

  const handleChangeInput = (e, item) => {
    const { name, value } = e.target;
    setDoiTacSelected({
      doiTacId,
      soDienThoaiDoiTac,
      tenDoiTac,
      diaChiDoiTac,
      [name]: name === "soDienThoaiDoiTac" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleXoaNhaPhanPhoi = (item) => {
    const { doiTacId } = item;
    const data = { doiTacId };
    const confirm = window.confirm(
      `Bạn có chắc muốn xoá ${
        item.tenDoiTac === null ? "" : item.tenDoiTac?.toUpperCase()
      } ?`
    );
    if (confirm) {
      deleteNhaPhanPhoi(data, headers, dispatch);
    } else {
      return;
    }
  };

  const handleSuaNhaPhanPhoi = async () => {
    const data = doiTacSelected;
    if (data !== null) {
      const res = await putNhaPhanPhoi(doiTacSelected, headers, dispatch);
      if (res === 209) {
        speak("trùng tên rồi, nhập tên khác");
        window.alert("Trùng tên, nhập tên khác");
        setDoiTacSelected(null);
      }
    }
  };

  return (
    <div className="nhaPhanPhoi">
      <div className="nhaPhanPhoiItem">
        <div className="inputItem">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="Tên nhà phân phối"
            name="tenDoiTac"
            className="tenDoiTac  borderBottom"
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
            onBlur={handleSuaNhaPhanPhoi}
          />
        </div>
        <div className="flex aic jcsbw g10">
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
