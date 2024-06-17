import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../asset/Animation.json"; // Ensure you have the correct path to your Lottie JSON file
import { useSelector } from "react-redux";

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { isLoading } = useSelector((state) => state.dataSlice);
  if (isLoading) {
    return (
      <div className="lottie">
        <h1>Loading...</h1>
        {/* <Lottie options={defaultOptions} height={200} width={200} />; */}
      </div>
    );
  }
};

export default LottieAnimation;
