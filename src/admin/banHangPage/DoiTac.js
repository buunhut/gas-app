import React from "react";
import DoiTacItem from "../khachNoPage/DoiTacItem";

const DoiTac = ({ listDoiTac, handleSelectDoiTac, indexItem }) => {
  return (
    <div className="khachHangContent mb10">
      <div className="slider">
        {listDoiTac?.map((doiTac, index) => {
          const { tenDoiTac } = doiTac;
          if (tenDoiTac !== null && tenDoiTac !== "") {
            return (
              <DoiTacItem
                key={index}
                doiTac={doiTac}
                handleSelectDoiTac={() => handleSelectDoiTac(index, doiTac)}
                indexItem={indexItem}
                index={index}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default DoiTac;
