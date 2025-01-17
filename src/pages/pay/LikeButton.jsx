import { useState } from "react";

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`flex items-center justify-center w-40 h-16 rounded-[10px] gap-1 cursor-auto hover:bg-primary-300 ${
          isLiked
            ? "bg-primary-500 "
            : "bg-white border-2 border-gray-100 border-solid"
        }`}
      >
        <span
          className={`text-popup-text ${
            isLiked ? "text-white" : "text-gray-700"
          }`}
        >
          좋아요
        </span>
        <img className="h-7" src="/assets/heart.png"></img>
      </div>
    </>
  );
}
