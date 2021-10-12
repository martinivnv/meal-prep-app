import { React, useState, Fragment } from "react";
import { FormControl, InputLabel, OutlinedInput, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import "./LoginBox.css";

const SignupBox = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorAlert, setErrorAlert] = useState("");
	const [successAlert, setSuccessAlert] = useState("");

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		axios
			.post("https://eatsy-server.herokuapp.com/user/signup/", {
				username: username,
				password: password,
			})
			.then((res) => {
				if (res.status === 200) {
					setSuccessAlert("Account created successfully!");
					setErrorAlert("");
				}
			})
			.catch((err) => {
				if (err.response.status === 422) {
					setErrorAlert("Username already exists.");
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
					<InputLabel htmlFor="component-outlined">New Username</InputLabel>
					<OutlinedInput
						id="username-input"
						value={username}
						onChange={handleUsernameChange}
						label="Username"
						className="loginFormInput"
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor="component-outlined">New Password</InputLabel>
					<OutlinedInput
						id="password-input"
						value={password}
						onChange={handlePasswordChange}
						label="Password"
						className="loginFormInput"
					/>
				</FormControl>
				<Button
					variant="contained"
					className="loginModalButton"
					color="primary"
					onClick={handleSubmit}
				>
					Sign Up
				</Button>
			</form>
			{errorAlert !== "" && <Alert severity="error">{errorAlert}</Alert>}
			{successAlert !== "" && <Alert severity="success">{successAlert}</Alert>}
		</Fragment>
	);
};

export default SignupBox;
