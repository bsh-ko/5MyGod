export default function LikeButton() {
  return (
    <>
      <div className="flex items-center justify-center w-40 h-16 rounded-[10px] bg-white border-gray-100 border-[2px] gap-1 ">
        <span className="text-gray-700 text-popup-text">좋아요</span>
        <img className="h-7" src="/assets/heart.png"></img>
      </div>
    </>
  );
}
