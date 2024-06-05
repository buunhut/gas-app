import React, { useState } from "react";
import ListPhieuNo from "./ListPhieuNo";
import DoiTacItem from "./DoiTacItem";

const ListDoiTacNo = ({ listDoiTacNo }) => {
  const [indexItem, setIndexItem] = useState(-1);

  const listPhieuNo = listDoiTacNo?.[indexItem]?.listPhieuNo;
  const tenDoiTac = listDoiTacNo?.[indexItem]?.tenDoiTac;

  const handleSelectDoiTac = (index) => {
    setIndexItem(index);
  };
  return (
    <div>
      <div className="slider">
        {listDoiTacNo?.map((doiTac, index) => {
          return (
            <DoiTacItem
              doiTac={doiTac}
              handleSelectDoiTac={handleSelectDoiTac}
              indexItem={indexItem}
              index={index}
              key={index}
            />
          );
        })}
      </div>
      <ListPhieuNo tenDoiTac={tenDoiTac} listPhieuNo={listPhieuNo} />
    </div>
  );
};

export default ListDoiTacNo;
