import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import CalendarGrid from "./components/CalendarGrid";

function App() {
	return (
		<Router>
			<div className="container">
				<NavBar />
				<CalendarGrid />
			</div>
		</Router>
	);
}

export default App;
