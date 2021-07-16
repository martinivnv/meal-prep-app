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
import axios from "axios";

const Calendar = (props) => {
	const calendarRef = useRef(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalType, setModalType] = useState("add");
	const [eventEl, setEventEl] = useState(null);

	useEffect(() => {
		let calendarApi = calendarRef.current.getApi();
		let date = Date.UTC(props.year, props.month);
		calendarApi.gotoDate(date);
	}, [props.month, props.year]);

	useEffect(() => {
		let calendarApi = calendarRef.current.getApi();
		axios
			.get("http://localhost:5000/meals/")
			.then((res) => {
				console.log(res);
				res.data.map((meal) => {
					calendarApi.addEvent({
						title: meal.name,
						id: meal._id,
						start: meal.date,
						end: DateTime.fromISO(meal.date)
							.plus({ days: meal.portions })
							.toISO(),
						allDay: true,
						color: handleColour(),
						extendedProps: {
							portions: meal.portions,
							cost: meal.cost,
							type: meal.type,
						},
					});
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const [data, setData] = useState({
		name: "",
		portions: 1,
		cost: 1,
		type: "",
		date: DateTime.now(),
		id: null,
	});

	const resetData = () => {
		setData({
			name: "",
			portions: 1,
			cost: 1,
			type: "",
			date: DateTime.now(),
			id: null,
		});
	};

	const handleColour = () => {
		switch (data.cost) {
			case 1:
				return "#28cc2d";
			case 2:
				return "#ffbf00";
			case 3:
				return "#d2222d";
			default:
				return "#3788d8";
		}
	};

	const handleOpen = () => setModalOpen(true);

	const handleClose = () => {
		resetData();
		setEventEl(null);
		setModalOpen(false);
	};

	const handleSave = (generatedId) => {
		let calendarApi = calendarRef.current.getApi();
		calendarApi.addEvent({
			title: data.name,
			id: generatedId,
			start: data.date,
			end: DateTime.fromISO(data.date).plus({ days: data.portions }).toISO(),
			allDay: true,
			color: handleColour(),
			extendedProps: {
				portions: data.portions,
				cost: data.cost,
				type: data.type,
			},
		});
		handleClose();
	};

	const saveToServer = () => {
		axios.post("http://localhost:5000/meals/add", data).then((res) => {
			console.log(res.data);
			handleSave(res.data);
		});
	};

	const handleUpdate = () => {
		eventEl.setProp("title", data.name);
		eventEl.setEnd(
			DateTime.fromISO(data.date).plus({ days: data.portions }).toISO()
		);
		eventEl.setExtendedProp("portions", data.portions);
		eventEl.setExtendedProp("cost", data.cost);
		eventEl.setExtendedProp("type", data.type);
		eventEl.setProp("color", handleColour());
		handleClose();
	};

	const updateToServer = () => {
		axios
			.post("http://localhost:5000/meals/update/" + data.id, data)
			.then((res) => {
				console.log(res.data);
				handleUpdate();
			});
	};

	const handleDelete = () => {
		eventEl.remove();
		handleClose();
	};

	const deleteFromServer = () => {
		axios.delete("http://localhost:5000/meals/" + data.id, data).then((res) => {
			console.log(res.data);
			handleDelete();
		});
	};

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
						InputProps={{
							inputProps: {
								max: 99,
								min: 1,
							},
						}}
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
					{modalType === "add" && (
						<Button
							variant="contained"
							className="modal-button"
							color="primary"
							onClick={saveToServer}
						>
							Save
						</Button>
					)}
					{modalType === "update" && (
						<Button
							variant="contained"
							className="modal-button"
							color="primary"
							onClick={updateToServer}
						>
							Update
						</Button>
					)}
					<Button
						variant="outlined"
						className="modal-button"
						color="secondary"
						onClick={handleClose}
					>
						Cancel
					</Button>
					{modalType === "update" && (
						<Button
							variant="outlined"
							className="modal-button"
							style={{ color: "#dc143c", borderColor: "#dc143c" }}
							onClick={deleteFromServer}
						>
							Delete
						</Button>
					)}
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
					setModalType("add");
					handleOpen();
				}}
				eventClick={(info) => {
					const e = info.event;
					setData({
						name: e.title,
						portions: e.extendedProps.portions,
						cost: e.extendedProps.cost,
						type: e.extendedProps.type,
						date: e.startStr,
						id: e.id,
					});
					console.log(e);
					setEventEl(e);
					setModalType("update");
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
