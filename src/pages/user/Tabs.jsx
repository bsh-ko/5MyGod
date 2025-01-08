import React from "react";

export default function Tabs({ tabs, activeTab, onTabClick }) {
  return (
    <div className="flex border-b bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`w-1/2 py-3 text-center font-bold ${
            activeTab === tab.id
              ? "text-gray-black-900 bg-white border-b-primary-500 border-b-[2px]"
              : "text-gray-700 bg-gray-100"
          }`}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
