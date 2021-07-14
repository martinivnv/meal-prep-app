import { React, useRef, useEffect, useState, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

const Calendar = (props) => {
	const calendarRef = useRef(null);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		let calendarApi = calendarRef.current.getApi();
		let date = Date.UTC(props.year, props.month);
		calendarApi.gotoDate(date);
	}, [props.month, props.year]);

	const handleOpen = () => setModalOpen(true);

	const handleClose = () => setModalOpen(false);

	const handleSave = () => {};

	const [body, setBody] = useState({
		name: "",
		portions: 1,
		cost: 1,
		type: "",
		date: Date.now(),
	});

	const modalForm = (
		<div class="modalContent">
			<h2 id="modalTitle">Add A Meal</h2>
			<form className="modalForm" noValidate autoComplete="off">
				<TextField id="meal-name" label="Meal Name" required />
			</form>
		</div>
	);

	return (
		<Fragment>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				headerToolbar={false}
				height={"92vh"}
				ref={calendarRef}
				dateClick={(info) => {
					setBody({
						...body,
						date: info.date,
					});
					handleOpen();
				}}
			/>
			<Modal
				open={modalOpen}
				onClose={handleClose}
				className="mealModal"
				aria-labelledby="meal-modal"
				aria-describedby="add-edit-delete-meals"
			>
				{modalForm}
			</Modal>
		</Fragment>
	);
};

export default Calendar;
