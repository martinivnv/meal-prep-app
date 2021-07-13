import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Calendar from "./components/Calendar";
import { DateTime } from "luxon";
import { useState } from "react";

function App() {
	const now = DateTime.now();
	const [month, setMonth] = useState(now.month);
	const [year, setYear] = useState(now.year);
	console.log(month);
	console.log(year);

	function changeMonthHandler(command) {
		switch (command) {
			case "next":
				if (month === 12) {
					setMonth(1);
					setYear(year + 1);
				} else {
					setMonth(month + 1);
				}
				break;
			case "prev":
				if (month === 1) {
					setMonth(12);
					setYear(year - 1);
				} else {
					setMonth(month - 1);
				}
				break;
			case "getDate":
				return [month, year];
			default:
				break;
		}
	}

	return (
		<Router>
			<div className="container">
				<NavBar month={month} year={year} changeMonth={changeMonthHandler} />
				<Calendar />
			</div>
		</Router>
	);
}

export default App;
