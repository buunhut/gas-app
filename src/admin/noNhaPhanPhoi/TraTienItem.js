import moment from "moment";
import React, { useState } from "react";
import { deleteTraTien } from "../../api/deleteAPI";
import { useDispatch, useSelector } from "react-redux";
import { putTraTien } from "../../api/putAPI";

const TraTienItem = ({ traTien }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);

  const { traTienId, ngay, soTien } = traTien;

  const [editSoTien, editEditSoTien] = useState(null);

  const handleChangeInput = (e, item) => {
    const { value } = e.target;
    editEditSoTien(+value.replaceAll(/[^0-9]/g, ""));
  };

  const handleEditTraTien = () => {
    if (editSoTien === null) {
      return;
    }
    const confirm = window.confirm(`Bạn có chắc muốn sửa dòng này ?`);
    if (confirm) {
      const data = {
        traTienId,
        soTien: editSoTien,
      };
      //   console.log(data);
      putTraTien(data, headers, dispatch);
    }
    editEditSoTien(null);
  };

  const handleXoaTraTien = (item) => {
    const confirm = window.confirm(`Bạn có chắc muốn xoá dòng này ?`);
    if (confirm) {
      const { traTienId } = item;
      const data = { traTienId };
      deleteTraTien(data, headers, dispatch);
    }
  };
  return (
    <div className="traDetailWrap">
      <div className="traDetail">
        <div className="traDetailItem">
          <i
            className="fa-solid fa-xmark"
            onClick={() => handleXoaTraTien(traTien)}
          ></i>
          <p>{moment(ngay).format("DD/MM/YYYY")}</p>
        </div>
        <input
          className="right"
          type="text"
          value={
            editSoTien !== null
              ? editSoTien === 0
                ? ""
                : editSoTien?.toLocaleString()
              : soTien?.toLocaleString()
          }
          onChange={(e) => handleChangeInput(e, traTien)}
          onBlur={handleEditTraTien}
        />
      </div>
    </div>
  );
};

export default TraTienItem;
