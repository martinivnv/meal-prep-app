import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Calendar from "./components/Calendar";
import LoginModal from "./components/LoginModal";
import { DateTime } from "luxon";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
	const now = DateTime.now();
	const [month, setMonth] = useState(now.month);
	const [year, setYear] = useState(now.year);

	const theme = createTheme({
		palette: {
			primary: {
				main: "#007769",
			},
			secondary: {
				main: "#ffb300",
			},
		},
	});

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
			default:
				break;
		}
	}

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<div className="container">
					<LoginModal />
					<NavBar month={month} year={year} changeMonth={changeMonthHandler} />
					<Calendar month={month} year={year} />
				</div>
			</ThemeProvider>
		</Router>
	);
}

export default App;
