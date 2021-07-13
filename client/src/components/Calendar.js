import { React, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

const Calendar = (props) => {
	const calendarRef = useRef(null);

	useEffect(() => {
		let calendarApi = calendarRef.current.getApi();
		let date = Date.UTC(props.year, props.month);
		calendarApi.gotoDate(date);
	}, [props.month, props.year]);

	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			headerToolbar={false}
			height={"92vh"}
			ref={calendarRef}
		/>
	);
};

export default Calendar;
