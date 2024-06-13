import React, { useState } from "react";
import ListPhieuNo from "./ListPhieuNo";
import DoiTacItem from "./DoiTacItem";

const ListDoiTacNo = ({ listDoiTacNo, indexItem, setIndexItem }) => {
  const handleSelectDoiTac = (index) => {
    setIndexItem(index);
  };

  let listPhieuNo = [];

  if (indexItem !== -1) {
    listPhieuNo = listDoiTacNo?.[indexItem]?.listPhieuNo;
  } else {
    listPhieuNo = listDoiTacNo.reduce((acc, item) => {
      const { tenDoiTac, listPhieuNo } = item;
      listPhieuNo.forEach((phieuNo) => {
        acc.push({ tenDoiTac, ...phieuNo });
      });
      return acc;
    }, []);
  }

  const tenDoiTac = listDoiTacNo?.[indexItem]?.tenDoiTac;

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
