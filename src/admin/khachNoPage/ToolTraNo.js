import React, { useState } from "react";
import "./tooltrano.scss";
import { postTraDuPhieu, postTraTien, postTraVo } from "../../api/postAPI";
import { useDispatch, useSelector } from "react-redux";

const ToolTraNo = ({ noTien, noVo, donHangId }) => {
  const dispatch = useDispatch();
  const { headers, listLoaiVo } = useSelector((state) => state.dataSlice);

  const [traTien, setTraTien] = useState({});
  const handleChangeSoTienTra = (e) => {
    const { name, value } = e.target;
    setTraTien((prevState) => ({
      ...prevState,
      [name]: +value.replaceAll(/[^0-9]/g, ""),
    }));
  };
  const handleTraTien = async () => {
    if (traTien?.soTien === undefined || traTien?.soTien === 0) {
      return;
    }
    const confirm = window.confirm(
      `Bạn có chắc đã thu ${traTien?.soTien?.toLocaleString()}đ`
    );
    if (confirm) {
      const data = {
        donHangId,
        soTien: traTien?.soTien || null,
      };
      //   console.log(data);
      await postTraTien(data, headers, dispatch);
    }
    setTraTien({});
  };

  const [traVo, setTraVo] = useState({});
  const handleChangeSoVoTra = (e, item) => {
    const { value } = e.target;
    const { loaiVoName, loaiVoId } = item;
    setTraVo({
      [loaiVoId]: {
        donHangId,
        loaiVo: loaiVoName,
        loaiVoId,
        soLuong: +value.replaceAll(/[^0-9]/g, ""),
      },
    });
  };
  const handleTraVo = async (item) => {
    const { loaiVoId } = item;
    if (
      traVo?.[loaiVoId]?.soLuong === undefined ||
      traVo?.[loaiVoId]?.soLuong === 0
    ) {
      return;
    }
    const confirm = window.confirm(
      `Bạn có chắc đã thu ${traVo?.[
        loaiVoId
      ]?.soLuong?.toLocaleString()} ${traVo?.[loaiVoId]?.loaiVo.toUpperCase()}`
    );
    if (confirm) {
      const data = {
        donHangId,
        loaiVoId: traVo?.[loaiVoId].loaiVoId,
        loaiVo: traVo?.[loaiVoId].loaiVo,
        soLuong: traVo?.[loaiVoId].soLuong || null,
      };
      //   console.log(data);
      await postTraVo(data, headers, dispatch);
    }
    setTraVo({});
  };

  const handleTraDu = (donHangId) => {
    const confirm = window.confirm(`Bạn có chắc đã thu đủ tiền và vỏ ?`);
    if (confirm) {
      const data = { donHangId };
      postTraDuPhieu(data, headers, dispatch);
    }
  };

  return (
    (noTien !== 0 || noVo !== 0) && (
      <div className="traNoTool">
        <div className="traItem" onClick={() => handleTraDu(donHangId)}>
          <button className="traDu">Trả đủ</button>
        </div>
        <div className="tienVoItem">
          {noTien !== 0 && (
            <div className="traTien">
              <input
                type="text"
                name="soTien"
                value={
                  traTien?.soTien !== undefined
                    ? traTien?.soTien === 0
                      ? ""
                      : traTien?.soTien?.toLocaleString()
                    : ""
                }
                placeholder="Số tiền"
                onChange={handleChangeSoTienTra}
                onBlur={handleTraTien}
              />
            </div>
          )}
          {noVo !== 0 && (
            <div className="traVo">
              {listLoaiVo?.map((item, index) => {
                const { loaiVoId, loaiVoName } = item;
                if (loaiVoName !== null && loaiVoName !== "") {
                  return (
                    <div className="traVoItem" key={index}>
                      <label htmlFor={loaiVoId}>
                        {loaiVoName?.toUpperCase()}
                      </label>
                      <input
                        type="text"
                        id={loaiVoId}
                        value={
                          traVo?.[loaiVoId]?.soLuong !== undefined
                            ? traVo?.[loaiVoId]?.soLuong === 0
                              ? ""
                              : traVo?.[loaiVoId]?.soLuong.toLocaleString()
                            : ""
                        }
                        onChange={(e) => handleChangeSoVoTra(e, item)}
                        onBlur={() => handleTraVo(item)}
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ToolTraNo;
