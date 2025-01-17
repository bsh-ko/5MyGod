import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

export default function Introduction({ userId, editIntroduction }) {
  const [introduction, setIntroduction] = useState(editIntroduction);
  const [isEditing, setIsEditing] = useState(false);
  const [warning, setWarning] = useState(false);
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedData) => axios.patch(`/users/${userId}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] }); // Refresh user profile data
      alert("수정 성공");
      setIsEditing(false);
    },
    onError: (error) => {
      console.error(error);
      alert("잠시 후 다시 시도해주세요.");
    },
  });

  const handleSaveClick = () => {
    mutation.mutate({ extra: { introduction } });
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setIntroduction(editIntroduction);
  };

  const handleInputChange = (e) => {
    const newIntroduction = e.target.value;
    setIntroduction(newIntroduction);
    // 30자 이상이면 경고 표시
    if (newIntroduction.length > 30) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };

  return (
    <div className="intro bg-white p-5">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold mb-3 text-gray-700">자기소개</h3>
        <div className="flex space-x-2">
          {!isEditing ? (
            <button onClick={handleEditClick} className="text-primary-500 font-bold text-sm">
              수정하기
            </button>
          ) : (
            <>
              <button onClick={handleCancelClick} className="text-gray-500 font-bold text-sm">
                취소하기
              </button>
              <button onClick={handleSaveClick} className="text-primary-500 font-bold text-sm">
                저장하기
              </button>
            </>
          )}
        </div>
      </div>
      {!isEditing ? (
        <p>{introduction}</p>
      ) : (
        <>
          <textarea
            value={introduction}
            onChange={handleInputChange}
            className="w-full h-20 border border-gray-300 rounded-md p-2"
            placeholder="자기소개를 입력하세요."
            maxLength={30}
          />
          <div className="text-right text-sm text-gray-500">{introduction.length}/30</div>
          {warning && <div className="text-red-500 text-xs mt-1">자기소개는 30자 이하로 작성해주세요.</div>}
        </>
      )}
    </div>
  );
}
