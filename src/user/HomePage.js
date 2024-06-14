import React, { useEffect, useState } from "react";
import "./homepage.scss";
import LottieAnimation from "../admin/component/LottieAnimation";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const navigate = useNavigate();

  const TypingEffect = ({ text, speed }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
      if (index < text.length) {
        const timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev + text.charAt(index));
          setIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(timeoutId);
      } else {
        setIsTypingComplete(true);
      }
    }, [index, text, speed]);

    return (
      <div className="introduce">
        <div className="typing-container">
          <span>{displayedText}</span>
          <span className={`cursor ${isTypingComplete ? "hidden" : ""}`}>
            |
          </span>
        </div>
        <button
          style={{ opacity: isTypingComplete ? "1" : "0" }}
          className="dangNhap"
          type="button"
          onClick={() => navigate("dang-nhap")}
        >
          Dùng thử ngay
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="orange"></div>
      <div className="orangered"></div>
      <div className="black"></div>

      <div className="homepage">
        <TypingEffect
          text="Phần mềm quản lý cửa hàng kinh doanh Gas"
          speed={100}
        />
      </div>
    </>
  );
};

export default HomePage;
