import React from "react";
import ListItem from "@pages/errand/ListItem";

const MyApplies = ({ applyData }) => {
  if (!applyData?.item || applyData.item.length === 0) {
    return (
      <div className="pt-5 items-center text-center text-gray-500">
        지원한 심부름이 없습니다.
      </div>
    );
  }

  // 데이터 변환 함수
  const transformDataForListItem = (data) => ({
    _id: data._id,
    name: data.name,
    price: data.price,
    createdAt: data.createdAt,
    extra: {
      category: data.extra?.category || [],
      tags: data.extra?.tags || [],
      due: data.extra?.due || "",
      productState: data.extra?.productState || [],
    },
  });

  // products 배열을 펼치고 각 항목을 ListItem에 전달
  const applyList = applyData.item.flatMap((applyItem) =>
    applyItem.products.map((product) => (
      <ListItem key={product._id} item={transformDataForListItem(product)} />
    ))
  );

  return <ul className="space-y-3">{applyList}</ul>;
};

export default MyApplies;
