import React from "react";
import ListItem from "@pages/board/ListItem";

const MyRequests = ({ requestData }) => {
  const requestList = requestData?.item.map((item) => <ListItem key={item._id} item={item} />);
  return (
    <div>
      {requestList && requestList.length === 0 ? (
        <div className="pt-5 items-center text-center text-gray-500">요청한 심부름이 없습니다.</div>
      ) : (
        <ul className="space-y-3">{requestList}</ul>
      )}
    </div>
  );
};

export default MyRequests;
