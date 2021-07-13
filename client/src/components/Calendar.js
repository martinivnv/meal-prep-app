import { React } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

const Calendar = (props) => {
	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			headerToolbar={false}
			height={"92vh"}
		/>
	);
};

export default Calendar;
