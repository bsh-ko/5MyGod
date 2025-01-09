import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

DateAndTimePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
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
      className="w-20 h-40 overflow-y-scroll snap-y snap-mandatory border border-gray-300 rounded-lg text-center"
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

export default function DateAndTimePicker({ onDateChange }) {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDay, setSelectedDay] = useState("01");
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");

  // 날짜가 변경될 때마다 상위 컴포넌트에 전달
  useEffect(() => {
    onDateChange(
      `${selectedYear}.${selectedMonth}.${selectedDay} ${selectedHour}:${selectedMinute}:00`
    );
  }, [
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour,
    selectedMinute,
    onDateChange,
  ]);

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
    <div className="p-5 bg-white rounded-lg shadow-md flex flex-col gap-6">
      <p className="text-lg font-semibold text-gray-700">
        심부름의 날짜와 시간을 선택해주세요
      </p>

      <div className="flex gap-4 justify-center">
        <Picker
          options={years}
          selectedValue={selectedYear}
          onChange={setSelectedYear}
        />
        <Picker
          options={months}
          selectedValue={selectedMonth}
          onChange={setSelectedMonth}
        />
        <Picker
          options={days}
          selectedValue={selectedDay}
          onChange={setSelectedDay}
        />
        <Picker
          options={hours}
          selectedValue={selectedHour}
          onChange={setSelectedHour}
        />
        <Picker
          options={minutes}
          selectedValue={selectedMinute}
          onChange={setSelectedMinute}
        />
      </div>

      <div className="text-gray-500 text-center mt-4">
        선택된 날짜 및 시간:{" "}
        {`${selectedYear}.${selectedMonth}.${selectedDay} ${selectedHour}:${selectedMinute}:00`}
      </div>
    </div>
  );
}
