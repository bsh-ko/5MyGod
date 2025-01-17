import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useAxiosInstance from "@hooks/useAxiosInstance";

export default function Edit({ users, setIsEditing, onUserUpdate }) {
  const axios = useAxiosInstance();
  const [introLength, setIntroLength] = useState(users?.item.extra.introduction?.length || 0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      introduction: users?.item.extra.introduction || "",
      errands: users?.item.extra.errands || [""],
      transportation: users?.item.extra.transportation || [""],
      details: users?.item.extra.details || [""],
      experience: users?.item.extra.experience || [""],
      certificates: users?.item.extra.certificates || [""],
      business: users?.item.extra.business || [""],
    },
  });

  const {
    fields: errandsFields,
    append: appendErrands,
    remove: removeErrands,
  } = useFieldArray({
    control,
    name: "errands",
  });

  const {
    fields: transportationFields,
    append: appendTransportation,
    remove: removeTransportation,
  } = useFieldArray({
    control,
    name: "transportation",
  });

  const {
    fields: detailsFields,
    append: appendDetails,
    remove: removeDetails,
  } = useFieldArray({
    control,
    name: "details",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: certificatesFields,
    append: appendCertificates,
    remove: removeCertificates,
  } = useFieldArray({
    control,
    name: "certificates",
  });

  const {
    fields: businessFields,
    append: appendBusiness,
    remove: removeBusiness,
  } = useFieldArray({
    control,
    name: "business",
  });

  const onSubmit = (data) => {
    const updatedUser = {
      ...users.item,
      extra: {
        ...users.item.extra,
        ...data,
      },
    };

    axios
      .patch(`/users/${users.item._id}`, updatedUser)
      .then(() => {
        onUserUpdate(updatedUser);
        alert("수정 완료되었습니다.");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("수정 오류:", error);
        alert("잠시 후 다시 수정해주세요.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 자기소개 */}
      <div className="intro bg-white mx-5 my-3 p-5 rounded-[10px] shadow-card-shadow px-[22px] py-[18px] gap-[24px] items-center">
        <label htmlFor="introduction" className="block text-lg font-bold mb-2">
          자기소개
        </label>
        <textarea
          id="introduction"
          rows="2"
          placeholder="자기소개를 작성하세요. (최대 30자)"
          maxLength={30}
          className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 ${
            introLength >= 30 ? "border-red-500" : ""
          }`}
          {...register("introduction", {
            required: "자기소개는 필수입니다.",
            maxLength: { value: 30, message: "자기소개는 30자 이내로 작성해주세요." },
          })}
          onChange={(e) => setIntroLength(e.target.value.length)}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-red-500 text-sm">{errors.introduction && errors.introduction.message}</p>
          <p className={`text-sm ${introLength >= 30 ? "text-red-500" : "text-gray-500"}`}>{introLength}/30</p>
        </div>
      </div>

      {/* 심부름 */}
      <div className="intro bg-white mx-5 my-3 p-5 rounded-[10px] shadow-card-shadow px-[22px] py-[18px] gap-[24px] items-center">
        <div className="flex justify-between items-center mb-2">
          <label className="text-lg font-bold ">심부름</label>
          <button
            type="button"
            className="items-center text-blue-500 text-sm font-bold mr-[2px]"
            onClick={() => appendErrands("")}
          >
            ➕
          </button>
        </div>
        <div className="">
          {errandsFields.map((field, index) => (
            <div key={field.id} className="flex flex-wrap items-center">
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="심부름을 입력하세요."
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                className="ml-2 text-red-500 font-bold flex-shrink-0"
                onClick={() => removeErrands(index)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 이동수단 */}
      <div className="intro bg-white mx-5 p-5 rounded-[10px] shadow-card-shadow px-[22px] py-[18px] gap-[24px] items-center">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-lg font-bold">이동수단</label>
          <button
            type="button"
            className="items-center text-blue-500 text-sm font-bold mr-[2px]"
            onClick={() => appendTransportation("")}
          >
            ➕
          </button>
        </div>
        <div className="space-y-3">
          {transportationFields.map((field, index) => (
            <div key={field.id} className="flex flex-wrap items-center">
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="이동수단을 입력하세요."
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                className="ml-2 text-red-500 font-bold flex-shrink-0"
                onClick={() => removeTransportation(index)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* 심부름 상세 */}
      <div className="intro bg-white mx-5 my-3 p-5 rounded-[10px] shadow-card-shadow px-[22px] py-[18px] gap-[24px] items-center">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-lg font-bold mb-2">심부름 상세</label>
          <button
            type="button"
            className="items-center text-blue-500 text-sm font-bold"
            onClick={() => appendDetails("")}
          >
            ➕
          </button>
        </div>
        {detailsFields.map((field, index) => (
          <div key={field.id} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="심부름 상세를 입력하세요."
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            <button type="button" className="ml-2 mb-5 text-red-500 font-bold" onClick={() => removeDetails(index)}>
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* 경력 */}
      <div className="intro bg-white mx-5 my-3 p-5 rounded-[10px] shadow-card-shadow px-[22px] py-[18px] gap-[24px] items-center">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-lg font-bold mb-2">경력</label>
          <button
            type="button"
            className="items-center text-blue-500 text-sm font-bold mr-[2px]"
            onClick={() => appendExperience("")}
          >
            ➕
          </button>
        </div>
        {experienceFields.map((field, index) => (
          <div key={field.id} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="경력을 입력하세요."
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            <button type="button" className="ml-2 text-red-500 font-bold" onClick={() => removeExperience(index)}>
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* 자격증 */}
      <div className="intro bg-white mx-5 my-3 p-5 rounded-[10px] shadow-card-shadow px-[22px] py-[18px] gap-[24px] items-center">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-lg font-bold mb-2">자격증</label>
          <button
            type="button"
            className="items-center text-blue-500 text-sm font-bold"
            onClick={() => appendCertificates("")}
          >
            ➕
          </button>
        </div>
        {certificatesFields.map((field, index) => (
          <div key={field.id} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="자격증을 입력하세요."
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            <button type="button" className="ml-2 text-red-500 font-bold" onClick={() => removeCertificates(index)}>
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* 사업자 */}
      <div className="intro bg-white mx-5 my-3 p-5 rounded-[10px] shadow-card-shadow px-[22px] py-[18px] gap-[24px] items-center">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-lg font-bold mb-2">사업자</label>
          <button
            type="button"
            className="items-center text-blue-500 text-sm font-bold mr-[2px]"
            onClick={() => appendBusiness("")}
          >
            ➕
          </button>
        </div>
        {businessFields.map((field, index) => (
          <div key={field.id} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="사업자를 입력하세요."
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            <button type="button" className="ml-2 text-red-500 font-bold" onClick={() => removeBusiness(index)}>
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 pb-24 my-2 px-5">
        <button
          type="button"
          className="bg-gray-500 text-white font-semibold py-2 px-4 rounded mr-[2px]"
          onClick={() => setIsEditing(false)}
        >
          취소
        </button>
        <button type="submit" className=" bg-blue-500 text-white font-semibold py-2 px-4 rounded">
          저장
        </button>
      </div>
      <div className="mb-10"></div>
    </form>
  );
}
