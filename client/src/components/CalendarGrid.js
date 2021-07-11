import React from "react";

const CalendarGrid = () => {
	const gridStyles = {
		grid: {
			display: "grid",
			width: "100%",
			height: "90vh",
			gridTemplateColumns: "auto auto auto auto auto auto auto",
			gridTemplateRows: "30px auto auto auto auto auto",
		},
		day: {
			border: "0.5px solid #dadce0",
		},
		dayName: {
			color: "white",
			backgroundColor: "#dadce0",
			display: "flex",
			justifyContent: "center",
		},
	};
	var days = [];
	for (let i = 1; i <= 35; i++) {
		let day = <div className="day" id={"day_" + i} style={gridStyles.day} />;
		days.push(day);
	}

	const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

	return (
		<div className="calendarGrid" style={gridStyles.grid}>
			{dayNames.map((letter) => (
				<div className="dayName">
					<span>{letter}</span>
				</div>
			))}
			{days}
		</div>
	);
};

export default CalendarGrid;
