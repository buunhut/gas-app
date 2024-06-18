import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NhaPhanPhoiItem from "./NhaPhanPhoiItem";
import { postNhaPhanPhoi, postTimKiemNhaPhanPhoi } from "../../api/postAPI";
import { getNhaPhanPhoi } from "../../api/getAPI";

const NhaPhanPhoi = () => {
  const dispatch = useDispatch();
  const { headers, listNhaPhanPhoi } = useSelector((state) => state.dataSlice);

  const soLuongNhaPhanPhoi = listNhaPhanPhoi.length;

  const handleTaoNhaPhanPhoi = () => {
    postNhaPhanPhoi(headers, dispatch);
  };

  const [keyword, setKeyword] = useState("");

  const handleTimNhaPhanPhoi = (e, headers, dispatch) => {
    setKeyword(e.target.value);
    const data = { keyword: e.target.value.trim() };
    postTimKiemNhaPhanPhoi(data, headers, dispatch);
  };

  useEffect(() => {
    getNhaPhanPhoi(headers, dispatch);
  }, []);
  return (
    <div>
      <h3 className="mtb10 tac">
        Danh sách nhà phân phối ({soLuongNhaPhanPhoi.toLocaleString()})
      </h3>
      <div className="flex aic">
        <button className="btn ml10" onClick={handleTaoNhaPhanPhoi}>
          <i className="fa-solid fa-user-plus"></i>
        </button>
        <div className="inputItem mr10 ml10">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className="timKiem"
            type="text"
            placeholder="Tìm nhà phân phối..."
            value={keyword}
            onChange={(e) => handleTimNhaPhanPhoi(e, headers, dispatch)}
          />
        </div>
      </div>
      {listNhaPhanPhoi?.map((item, index) => {
        return <NhaPhanPhoiItem key={index} item={item} />;
      })}
    </div>
  );
};

export default NhaPhanPhoi;
