import React from "react";
import { deleteTraVo } from "../../api/deleteAPI";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const TraVoItem = ({ traVo }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);

  const { ngay, soLuong, loaiVo } = traVo;

  const handleXoaTraVo = (item) => {
    const confirm = window.confirm(`Bạn có chắc muốn xoá dòng này ?`);
    if (confirm) {
      const { traVoId } = item;
      const data = { traVoId };
      deleteTraVo(data, headers, dispatch);
    }
  };

  return (
    <div className="traDetailWrap">
      <div className="traDetail">
        <div className="traDetailItem">
          <i
            className="fa-solid fa-xmark"
            onClick={() => handleXoaTraVo(traVo)}
          ></i>
          <p>{moment(ngay).format("DD/MM/YYYY")}</p>
        </div>

        <p className="right">
          {soLuong.toLocaleString()} {loaiVo}
        </p>
      </div>
    </div>
  );
};

export default TraVoItem;
