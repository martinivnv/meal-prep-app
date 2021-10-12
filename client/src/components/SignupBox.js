import { React, useState } from "react";
import { FormControl, InputLabel, OutlinedInput, Button } from "@mui/material";
import "./LoginBox.css";

const SignupBox = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const submit = (e) => {
		console.log("Submitted login attempt");
	};

	return (
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
				onClick={submit}
			>
				Sign Up
			</Button>
		</form>
	);
};

export default SignupBox;
