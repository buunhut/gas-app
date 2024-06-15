import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chitietban.scss";
import { postSortPhieu } from "../../api/postAPI";
import ChiTietInfo from "./ChiTietInfo";
import ChiTietItem from "./ChiTietItem";
import moment from "moment";

const ChiTietNhap = () => {
  const dispatch = useDispatch();
  const { headers, listPhieuNhapSaving } = useSelector(
    (state) => state.dataSlice
  );
  // console.log(listPhieuXuatSaving);

  const uniqueNhaPhanPhoi = Array.from(
    new Map(
      listPhieuNhapSaving?.map((item) => [
        item.doiTacId,
        { tenDoiTac: item.tenDoiTac, doiTacId: item.doiTacId },
      ])
    ).values()
  );

  // console.log(uniqueNhaPhanPhoi);

  // const date = new Date().toISOString().split("T")[0];
  const date = moment().utcOffset(7).format("YYYY-MM-DD");

  const [sort, setSort] = useState({
    fromDay: date,
    toDay: null,
    doiTacId: null,
    sanPhamId: null,
    loaiPhieu: "pn",
  });

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    if (id === "doiTacId") {
      const selectedDoiTac = uniqueNhaPhanPhoi.find(
        (npp) => npp.tenDoiTac.toLowerCase() === value.toLowerCase()
      );
      setSort((prevState) => ({
        ...prevState,
        [id]: selectedDoiTac ? selectedDoiTac.doiTacId : null,
      }));
    } else {
      setSort((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  const handleSortPhieu = async (sort, headers, dispatch) => {
    await postSortPhieu(sort, headers, dispatch);
  };

  useEffect(() => {
    handleSortPhieu(sort, headers, dispatch);
  }, [sort, headers, dispatch]);

  return (
    <div className="chiTietBan">
      <h3 className="tac mt10">Chi tiết nhập hàng</h3>
      <div className="mt10">
        <form action="">
          <div className="flex aic jcsa gap10">
            <input
              type="date"
              id="fromDay"
              value={sort.fromDay}
              onChange={handleChangeInput}
            />
            <input type="date" id="toDay" onChange={handleChangeInput} />
          </div>

          <div className="flex aic jcsa gap10 mt10">
            <input
              list="doiTac"
              placeholder="Chọn nhà phân phối"
              id="doiTacId"
              onChange={handleChangeInput}
            />

            <datalist id="doiTac">
              {uniqueNhaPhanPhoi?.map((item, index) => (
                <option key={index} value={item.tenDoiTac.toUpperCase()}>
                  {item.tenDoiTac.toUpperCase()}
                </option>
              ))}
            </datalist>
          </div>
        </form>
      </div>
      {listPhieuNhapSaving.length > 0 ? (
        <>
          <ChiTietInfo listPhieuXuatSaving={listPhieuNhapSaving} />
          {listPhieuNhapSaving?.map((phieu, index) => {
            return <ChiTietItem phieu={phieu} key={index} sort={sort} />;
          })}
        </>
      ) : (
        <div className="noData">
          <h1>Không có dữ liệu</h1>
        </div>
      )}
    </div>
  );
};

export default ChiTietNhap;
