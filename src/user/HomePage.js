import React, { useEffect, useState } from "react";
import LottieAnimation from "../admin/component/LottieAnimation";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <div className="animationData">
      {/* <LottieAnimation /> */}
      <h3>home page</h3>
    </div>
  );
};

export default HomePage;
