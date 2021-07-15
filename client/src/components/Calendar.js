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
import { DateTime } from "luxon";

const Calendar = (props) => {
	const calendarRef = useRef(null);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		let calendarApi = calendarRef.current.getApi();
		let date = Date.UTC(props.year, props.month);
		calendarApi.gotoDate(date);
	}, [props.month, props.year]);

	const handleOpen = () => setModalOpen(true);

	const handleClose = () => {
		setData({
			name: "",
			portions: 1,
			cost: 1,
			type: "",
			date: DateTime.now(),
		});
		setModalOpen(false);
	};

	const handleSave = () => {};

	const [data, setData] = useState({
		name: "",
		portions: 1,
		cost: 1,
		type: "",
		date: DateTime.now(),
	});

	const modalForm = (
		<div className="modalContent">
			<h2 id="modalTitle">
				Add A Meal For{" "}
				{DateTime.fromISO(data.date).toLocaleString(DateTime.DATE_FULL)}
			</h2>
			<form className="modalForm" noValidate autoComplete="off">
				<TextField
					id="meal-name"
					label="Meal Name"
					helperText="e.g. Chicken Alfredo"
					value={data.name}
					required
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
				<div id="select-options">
					<TextField
						id="num-portions"
						type="number"
						label="Portions"
						value={data.portions}
						required
						onChange={(e) => setData({ ...data, portions: e.target.value })}
						fullWidth={false}
					/>
					<div id="cost-select-group">
						<InputLabel id="cost-select-label">Cost *</InputLabel>
						<Select
							labelId="cost-select-label"
							id="cost-select"
							value={data.cost}
							onChange={(e) => setData({ ...data, cost: e.target.value })}
							required
						>
							<MenuItem value={1}>$</MenuItem>
							<MenuItem value={2}>$$</MenuItem>
							<MenuItem value={3}>$$$</MenuItem>
						</Select>
					</div>
					<div id="type-select-group">
						<InputLabel id="type-select-label">Type *</InputLabel>
						<Select
							labelId="type-select-label"
							id="type-select"
							value={data.type}
							onChange={(e) => setData({ ...data, type: e.target.value })}
							required
						>
							<MenuItem value={"home-cooked"}>Home-Cooked</MenuItem>
							<MenuItem value={"delivery"}>Delivery</MenuItem>
							<MenuItem value={"dine out"}>Dine Out</MenuItem>
						</Select>
					</div>
				</div>
				<div className="button-group">
					<Button
						variant="contained"
						className="modal-button"
						color="primary"
						onClick={handleSave}
					>
						Save
					</Button>
					<Button
						variant="outlined"
						className="modal-button"
						color="secondary"
						onClick={handleClose}
					>
						Cancel
					</Button>
				</div>
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
					setData({
						...data,
						date: info.dateStr,
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
