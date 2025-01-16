import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useAxiosInstance from "@hooks/useAxiosInstance";

export default function Edit({ users, setIsEditing }) {
  const axios = useAxiosInstance();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      introduction: users?.item.extra.introduction || "",
      transportation: users?.item.extra.transportation || [""],
      details: users?.item.extra.details || [""],
      experience: users?.item.extra.experience || [""],
      certificates: users?.item.extra.certificates || [""],
      business: users?.item.extra.business || [""],
    },
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
    // 기존 데이터에 새로운 데이터를 병합
    const updatedUser = {
      ...users.item, // 기존 사용자 데이터
      extra: {
        ...users.item.extra, // 기존 extra 데이터
        ...data, // 수정된 데이터만 덮어쓰기
      },
    };

    // 서버에 PATCH 요청
    axios
      .patch(`/users/${users.item._id}`, updatedUser)
      .then(() => {
        alert("프로필이 수정되었습니다.");
        setIsEditing(false); // 수정 완료 후 수정 모드 종료
      })
      .catch((error) => {
        console.error("프로필 수정 오류:", error);
        alert("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
      {/* 자기소개 */}
      <div>
        <label htmlFor="introduction" className="block text-lg font-bold mb-2">
          자기소개
        </label>
        <textarea
          id="introduction"
          rows="4"
          placeholder="자기소개를 작성하세요."
          className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
          {...register("introduction", { required: "자기소개는 필수입니다." })}
        />
        {errors.introduction && <p className="text-red-500 text-sm">{errors.introduction.message}</p>}
      </div>

      {/* 반복 필드 처리 */}
      {[
        {
          name: "transportation",
          label: "심부름 이동수단",
          fields: transportationFields,
          append: appendTransportation,
          remove: removeTransportation,
        },
        {
          name: "details",
          label: "심부름 상세",
          fields: detailsFields,
          append: appendDetails,
          remove: removeDetails,
        },
        {
          name: "experience",
          label: "경력",
          fields: experienceFields,
          append: appendExperience,
          remove: removeExperience,
        },
        {
          name: "certificates",
          label: "자격증",
          fields: certificatesFields,
          append: appendCertificates,
          remove: removeCertificates,
        },
        {
          name: "business",
          label: "사업자",
          fields: businessFields,
          append: appendBusiness,
          remove: removeBusiness,
        },
      ].map(({ name, label, fields, append, remove }) => (
        <div key={name}>
          <label className="block text-lg font-bold mb-2">{label}</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`${label}을 입력하세요.`}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                {...register(`${name}.${index}`, { required: `${label}은 필수입니다.` })}
              />
              <button type="button" className="ml-2 text-red-500 font-bold" onClick={() => remove(index)}>
                삭제
              </button>
            </div>
          ))}
          {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
          <button type="button" className="mt-2 text-blue-500 font-bold" onClick={() => append("")}>
            추가하기
          </button>
        </div>
      ))}

      {/* 버튼들 */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="bg-gray-500 text-white font-semibold py-2 px-4 rounded"
          onClick={() => setIsEditing(false)}
        >
          취소
        </button>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
          저장
        </button>
      </div>
    </form>
  );
}
