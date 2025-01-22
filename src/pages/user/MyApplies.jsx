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

  // 주문 데이터에서 productInfo를 추출 및 가공하는 함수
  const extractProductInfo = (data) => ({
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

  // 주문(지원) 배열을 순회하며 가공, 리스트아이템에 전달할 배열(orderInfo와 productInfo를 포함함)을 생성
  const applyList = applyData.item.map((applyItem) => {
    const item = {
      orderInfo: applyItem, // 주문(지원) 정보
      productInfo: extractProductInfo(applyItem.products[0]), // 주문(지원) 안의 상품(심부름) 정보
    };
    return (
      <ListItem
        key={`${applyItem._id}-${applyItem.products[0]._id}`}
        item={item}
      />
    );
  });

  return <ul className="space-y-3">{applyList}</ul>;
};

export default MyApplies;
