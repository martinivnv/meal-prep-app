import { React, useState, useEffect } from "react";
import { useDynamicRefs } from "@cylution/react-dynamic-refs";
import { DateTime } from "luxon";
import "./Calendar.css";

const Calendar = () => {
	const [dateCurrent, setDateCurrent] = useState(DateTime.now());
	const [month, setMonth] = useState(dateCurrent.month);
	const [year, setYear] = useState(dateCurrent.year);
	const [day, setDay] = useState(dateCurrent.day);

	// Generate calendar grid
	const refs = useDynamicRefs();
	function generateCalendarGrid() {
		var days = [];
		for (let i = 1; i <= 35; i++) {
			let thisId = "day_" + i;
			let day = <div className="day" id={thisId} ref={refs.thisId} />;
			days.push(day);
		}
		return days;
	}
	const days = generateCalendarGrid();

	function generateDayNames() {
		const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
		const dayNameBar = dayNames.map((letter) => (
			<div className="dayName">
				<span>{letter}</span>
			</div>
		));
		return dayNameBar;
	}
	const dayNameBar = generateDayNames();

	return (
		<div className="calendarGrid">
			{dayNameBar}
			{days}
		</div>
	);
};

export default Calendar;
