import { React, useState, Fragment } from "react";
import { FormControl, InputLabel, OutlinedInput, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import "./LoginBox.css";

const LoginBox = ({ handleClose, setUserId }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorAlert, setErrorAlert] = useState("");

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		axios
			.post("https://eatsy-server.herokuapp.com/user/signin/", {
				username: username,
				password: password,
			})
			.then((res) => {
				if (res.status === 200) {
					setErrorAlert("");
					setUserId(username);
					handleClose();
				}
			})
			.catch((err) => {
				if (err.response.status === 404) {
					setErrorAlert("User not found.");
				} else if (err.response.status === 400) {
					setErrorAlert("Incorrect password.");
				} else {
					setErrorAlert("Something went wrong.");
				}
			});
		setUsername("");
		setPassword("");
	};

	return (
		<Fragment>
			<form className="modalForm" id="loginForm" noValidate autoComplete="off">
				<FormControl>
					<InputLabel htmlFor="component-outlined">Username</InputLabel>
					<OutlinedInput
						id="username-input"
						value={username}
						onChange={handleUsernameChange}
						label="Username"
						className="loginFormInput"
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor="component-outlined">Password</InputLabel>
					<OutlinedInput
						id="password-input"
						value={password}
						onChange={handlePasswordChange}
						label="Password"
						className="loginFormInput"
						type="password"
					/>
				</FormControl>
				<Button
					variant="contained"
					className="loginModalButton"
					color="primary"
					onClick={handleSubmit}
				>
					Log In
				</Button>
			</form>
			{errorAlert !== "" && <Alert severity="error">{errorAlert}</Alert>}
		</Fragment>
	);
};

export default LoginBox;
