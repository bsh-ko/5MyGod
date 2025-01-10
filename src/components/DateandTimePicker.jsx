import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

DateAndTimePicker.propTypes = {
  onDueChange: PropTypes.func.isRequired,
};

function Picker({ options, selectedValue, onChange }) {
  const containerRef = useRef(null);

  const handleScroll = () => {
    const scrollIndex = Math.round(containerRef.current.scrollTop / 40);
    onChange(options[scrollIndex]);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="w-12 h-40 overflow-y-scroll scrollbar-hide snap-y snap-mandatory border border-gray-300 rounded-lg text-center"
    >
      <div className="h-10" />
      {options.map((option) => (
        <div
          key={option}
          className={`h-10 flex items-center justify-center snap-center ${
            option === selectedValue ? "font-bold text-black" : "text-gray-400"
          }`}
        >
          {option}
        </div>
      ))}
      <div className="h-10" />
    </div>
  );
}

export default function DateAndTimePicker({ onDueChange }) {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDay, setSelectedDay] = useState("01");
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [confirmedDue, setConfirmedDue] = useState("");

  const handleConfirm = () => {
    const dueString = `${selectedYear}년 ${selectedMonth}월 ${selectedDay}일, ${selectedHour}시 ${selectedMinute}분`;
    setConfirmedDue(dueString); // 선택된 일시로 업데이트

    // New.jsx 로 전달
    onDueChange(
      `${selectedYear}.${selectedMonth}.${selectedDay} ${selectedHour}:${selectedMinute}:00`
    );
  };

  const years = Array.from({ length: 10 }, (_, i) => (2025 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  return (
    <div className="p-[12px] bg-white rounded-lg  flex flex-col gap-[16px]">
      <div className="flex gap-4 justify-center items-start">
        <div className="flex flex-col items-center gap-[8px]">
          <Picker
            options={years}
            selectedValue={selectedYear}
            onChange={setSelectedYear}
          />
          <span className="font-laundry text-sm font-bold text-gray-700 mb-2">
            년
          </span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <Picker
            options={months}
            selectedValue={selectedMonth}
            onChange={setSelectedMonth}
          />
          <span className="font-laundry text-sm font-bold text-gray-700 mb-2">
            월
          </span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <Picker
            options={days}
            selectedValue={selectedDay}
            onChange={setSelectedDay}
          />
          <span className="font-laundry text-sm font-bold text-gray-700 mb-2">
            일
          </span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <Picker
            options={hours}
            selectedValue={selectedHour}
            onChange={setSelectedHour}
          />
          <span className="font-laundry text-sm font-bold text-gray-700 mb-2">
            시
          </span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <Picker
            options={minutes}
            selectedValue={selectedMinute}
            onChange={setSelectedMinute}
          />
          <span className="font-laundry text-sm font-bold text-gray-700 mb-2">
            분
          </span>
        </div>
      </div>

      {confirmedDue && (
        <div className="font-pretendard font-bold text-xl text-center">
          {confirmedDue}
        </div>
      )}

      <button
        type="button"
        onClick={handleConfirm}
        className="p-2 bg-primary-400 font-laundry text-[20px] text-white rounded-lg"
      >
        결정
      </button>
    </div>
  );
}
