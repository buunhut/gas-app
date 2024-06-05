import React, { useState } from "react";
import DetailItem from "../khachNoPage/DetailItem";

const ListPhieuNo = ({ listPhieuNo, tenDoiTac }) => {
  const [showId, setShowId] = useState(-1);
  return (
    <div className="content">
      {listPhieuNo?.map((item, index) => {
        return (
          <div key={index} className="noItemWrap">
            <DetailItem
              tenDoiTac={tenDoiTac}
              item={item}
              showId={showId}
              setShowId={setShowId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListPhieuNo;
