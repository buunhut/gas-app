import React from "react";
import Lottie from "react-lottie";
import animationData from "../../asset/Animation.json"; // Ensure you have the correct path to your Lottie JSON file

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={200} width={200} />;
};

export default LottieAnimation;
