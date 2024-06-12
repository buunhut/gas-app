import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoaiVo } from "../../api/getAPI";
import { postLoaiVo } from "../../api/postAPI";
import { putLoaiVo } from "../../api/putAPI";
import { deleteLoaiVo } from "../../api/deleteAPI";

const LoaiVo = () => {
  const dispatch = useDispatch();
  const { listLoaiVo, headers } = useSelector((state) => state.dataSlice);

  const [loaiVoSelected, setLoaiVoSelected] = useState(null);
  const [editLoaiVo, setEditLoaiVo] = useState(null);

  const handleTaoLoaiVo = () => {
    postLoaiVo(headers, dispatch);
  };

  const handleSelectLoaiVo = (item) => {
    setLoaiVoSelected(item);
    setEditLoaiVo(item);
  };

  const handleChangeInput = (e, item) => {
    const { name, value } = e.target;
    if (name === "giaVo") {
      setEditLoaiVo({
        ...item,
        [name]: +value.replaceAll(/[^0-9]/g, ""),
      });
    } else {
      setEditLoaiVo({
        ...item,
        [name]: value,
      });
    }
  };

  const handleSuaLoaiVo = () => {
    putLoaiVo(editLoaiVo, headers, dispatch);
    setEditLoaiVo(null);
  };

  const handleDeleteLoaiVo = (item) => {
    const confirm = window.confirm(
      `Bạn có chắc muốn xoá ${
        item.loaiVoName === null ? "" : item.loaiVoName?.toUpperCase()
      }`
    );
    if (confirm) {
      deleteLoaiVo(item, headers, dispatch);
    }
  };

  useEffect(() => {
    getLoaiVo(headers, dispatch);
  }, [headers, dispatch]);

  return (
    <div className="mainContent">
      <div className="controller">
        <h5 className="title">Loại vỏ</h5>
        <button className="btn" onClick={handleTaoLoaiVo}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="category">
        <div className="categorySlider">
          {listLoaiVo?.map((item, index) => {
            const { loaiVoId, loaiVoName, giaVo, tonKho } = item;
            return (
              <div
                className="categoryWrap"
                key={index}
                onClick={() => {
                  setEditLoaiVo(item);
                }}
              >
                <div
                  className="categoryItem"
                  style={{
                    borderColor:
                      loaiVoSelected?.loaiVoId === loaiVoId ? "#009900" : "",
                  }}
                  onClick={() => handleSelectLoaiVo(item)}
                >
                  <div>
                    <input
                      type="text"
                      className="tenLoaiVo borderBottom"
                      name="loaiVoName"
                      placeholder="Tên loại vỏ"
                      value={
                        editLoaiVo?.loaiVoName !== undefined &&
                        editLoaiVo?.loaiVoId === loaiVoId
                          ? editLoaiVo.loaiVoName === null
                            ? ""
                            : editLoaiVo.loaiVoName
                          : loaiVoName === null
                          ? ""
                          : loaiVoName
                      }
                      onChange={(e) => handleChangeInput(e, item)}
                      onBlur={handleSuaLoaiVo}
                    />
                  </div>
                  <div>
                    <input
                      className="giaLoaiVo borderBottom"
                      type="text"
                      name="giaVo"
                      placeholder="Giá vỏ"
                      value={
                        editLoaiVo?.giaVo !== undefined &&
                        editLoaiVo?.loaiVoId === loaiVoId
                          ? editLoaiVo.giaVo === 0
                            ? ""
                            : editLoaiVo.giaVo.toLocaleString()
                          : giaVo === 0
                          ? ""
                          : giaVo.toLocaleString()
                      }
                      onChange={(e) => handleChangeInput(e, item)}
                      onBlur={handleSuaLoaiVo}
                    />
                  </div>
                  <div className="tonKho">
                    <p>Kho: {tonKho}</p>
                  </div>
                </div>
                <i
                  className="fa-solid fa-trash-can delete"
                  onClick={() => handleDeleteLoaiVo(item)}
                ></i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoaiVo;
