import { useNavigate } from "react-router-dom";

export default function NotificationItem({ notification }) {
  const navigate = useNavigate();

  const handleRequestClick = () => {
    navigate(`${notification?.extra?.url}`); // 클릭시 해당 url로 이동
    window.scrollTo(0, 0);
  };

  return (
    <li
      onClick={handleRequestClick}
      className="items-start p-4 bg-white border-b-2 border-b-gray-300"
    >
      <div className="flex space-x-2">
        <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
        <p className="text-sm tracking-tighter text-gray-500 content-center">
          {notification?.extra?.errand_title}
        </p>
      </div>
      <p className="text-regular-text font-semibold text-gray-900 pl-9">
        {notification?.content}
      </p>
    </li>
  );
}
