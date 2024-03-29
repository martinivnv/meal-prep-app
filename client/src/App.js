import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Calendar from "./components/Calendar";
import LoginModal from "./components/LoginModal";
import { DateTime } from "luxon";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Modal } from "@mui/material";

function App() {
	const now = DateTime.now();
	const [month, setMonth] = useState(now.month);
	const [year, setYear] = useState(now.year);
	const [userId, setUserId] = useState("");

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
					<Modal open={true} className="warningModal">
						<div className="modalContent" id="loginModalContent">
							<h2 className="modalTitle">Eatsy is down!</h2>
							<p>
								Please be patient, we are currently working on resolving issues
								with our server providers.
							</p>
						</div>
					</Modal>
					{/* <LoginModal setUserId={setUserId} /> */}
					<NavBar month={month} year={year} changeMonth={changeMonthHandler} />
					<Calendar month={month} year={year} userId={userId} />
				</div>
			</ThemeProvider>
		</Router>
	);
}

export default App;
