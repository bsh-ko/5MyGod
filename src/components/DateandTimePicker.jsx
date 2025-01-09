import { useState } from "react";
import MobilePicker from "react-mobile-picker";

export default function DateAndTimePicker() {
  const [valueGroups, setValueGroups] = useState({
    year: "2025",
    month: "01",
    day: "01",
    hour: "12",
    minute: "00",
  });

  const optionGroups = {
    year: Array.from({ length: 10 }, (_, i) => (2025 + i).toString()),
    month: Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    day: Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")),
    hour: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")),
    minute: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")),
  };

  const handleChange = (name, value) => {
    setValueGroups((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formattedDateTime = `${valueGroups.year}.${valueGroups.month}.${valueGroups.day} ${valueGroups.hour}:${valueGroups.minute}:00`;

  return (
    <div className="task_dateandtime p-[20px] bg-[#fff] rounded-lg shadow-card-shadow flex flex-col gap-[16px]">
      <p className="font-laundry text-input-title">
        심부름의 날짜와 시간을 선택해주세요
      </p>

      <div className="flex justify-center items-center">
        <MobilePicker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={handleChange}
        />
      </div>

      <div className="text-gray-500 mt-[16px]">
        선택된 날짜 및 시간: {formattedDateTime}
      </div>
    </div>
  );
}
