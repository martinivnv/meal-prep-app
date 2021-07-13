import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Calendar from "./components/Calendar";

function App() {
	return (
		<Router>
			<div className="container">
				<NavBar />
				<Calendar />
			</div>
		</Router>
	);
}

export default App;
