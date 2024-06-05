import moment from "moment";
import React from "react";
import ToolTraNoComponent from "./ToolTraNo";
import PhieuContent from "../banHangPage/PhieuContent";

const DetailItem = ({ item, tenDoiTac, showId, setShowId }) => {
  const { donHangId, ngay, giaoDich, loaiPhieu, tongNoTien, tongNoVo } = item;

  const handleSelectDonHang = (donHangId) => {
    setShowId((prevShowId) => (prevShowId === donHangId ? -1 : donHangId));
  };

  return (
    <>
      <div
        className="noItem"
        onClick={() => {
          handleSelectDonHang(donHangId);
        }}
      >
        <div className="noItemContent">
          <div className="flex g5">
            <p className="bold title">{moment(ngay).format("DD/MM/YYYY")}</p>

            <p className="bold title">
              #ID{donHangId}_{loaiPhieu.toUpperCase()}
            </p>

            <p className="bold title">{giaoDich.toUpperCase()}</p>
          </div>

          <h4>{tenDoiTac?.toUpperCase()}</h4>
        </div>
        <div className="noItemContent">
          <p className="vo title">Nợ vỏ</p>
          <p
            className="vo bold"
            style={{ color: tongNoVo !== 0 ? "red" : "black" }}
          >
            {tongNoVo?.toLocaleString()}
          </p>
        </div>
        <div className="noItemContent">
          <p className="right title">Nợ tiền</p>
          <p
            className="right bold"
            style={{ color: tongNoTien !== 0 ? "red" : "black" }}
          >
            {tongNoTien?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* click đơn hàng đẩu tiền nó mở ra, sau đó click đơn hàng khác nó không biết tự đóng lại */}
      {showId === donHangId && (
        <>
          {/* {traTien?.map((traTien, index) => {
              return <TraTienItem traTien={traTien} key={index} />;
            })}
            {traVo?.map((traVo, index) => {
              return <TraVoItem traVo={traVo} key={index} />;
            })} */}
          <PhieuContent item={item} toShow={false} />
          <ToolTraNoComponent
            noTien={tongNoTien}
            noVo={tongNoVo}
            donHangId={donHangId}
            loaiPhieu={loaiPhieu}
          />
        </>
      )}
    </>
  );
};

export default DetailItem;
