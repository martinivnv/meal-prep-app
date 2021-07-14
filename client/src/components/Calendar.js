import { React, useRef, useEffect, useState, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import {
	InputLabel,
	TextField,
	Modal,
	Select,
	MenuItem,
	Button,
} from "@material-ui/core";

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
		date: new Date(),
	});

	const modalForm = (
		<div class="modalContent">
			<h2 id="modalTitle">Add A Meal</h2>
			<form className="modalForm" noValidate autoComplete="off">
				<TextField
					id="meal-name"
					label="Meal Name"
					helperText="e.g. Chicken Alfredo"
					defaultValue={body.name}
					required
					//onChange={handleChange}
				/>
				<TextField
					id="num-portions"
					type="number"
					label="Portions"
					defaultValue={body.portions}
					required
					//onChange={handleChange}
				/>
				<InputLabel id="cost-select-label">Cost</InputLabel>
				<Select
					labelId="cost-select-label"
					id="cost-select"
					value={body.cost}
					//onChange={handleChange}
				>
					<MenuItem value={1}>$</MenuItem>
					<MenuItem value={2}>$$</MenuItem>
					<MenuItem value={3}>$$$</MenuItem>
				</Select>
				<InputLabel id="type-select-label">Type</InputLabel>
				<Select
					labelId="type-select-label"
					id="type-select"
					value={body.type}
					//onChange={handleChange}
				>
					<MenuItem value={"home-cooked"}>Home-Cooked</MenuItem>
					<MenuItem value={"delivery"}>Delivery</MenuItem>
					<MenuItem value={"dine out"}>Dine Out</MenuItem>
				</Select>
				<Button variant="contained" color="primary">
					Save
				</Button>
				<Button variant="outlined" color="secondary">
					Cancel
				</Button>
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
