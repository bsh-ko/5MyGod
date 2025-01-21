export default function ChatsList() {
  console.log("여기는 채팅");
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[393px] mx-auto my-auto min-h-screen bg-background-color items-center justify-center flex">
        <a className="font-laundry text-gray-600 text-xl">
          현재 진행중인 채팅이 없어요
        </a>
      </div>
    </div>
  );
}
