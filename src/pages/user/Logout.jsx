import React from "react";

const Logout = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
        <h2 className="text-lg font-semibold mb-4">로그아웃 하시겠습니까?</h2>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            취소
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-red-600">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
