import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoaiVo, getNoNhaPhanPhoi } from "../../api/getAPI";
import TheoDoiNo from "./TheoDoiNo";

const NoNhaPhanPhoi = () => {
  const dispatch = useDispatch();
  const { headers, listNoNhaPhanPhoi } = useSelector(
    (state) => state.dataSlice
  );


  useEffect(() => {
    getNoNhaPhanPhoi(headers, dispatch);
    getLoaiVo(headers, dispatch);
  }, [headers, dispatch]);

  return (
    <TheoDoiNo listData={listNoNhaPhanPhoi} titlePage={"Nợ nhà phân phối"} />
  );
};

export default NoNhaPhanPhoi;
