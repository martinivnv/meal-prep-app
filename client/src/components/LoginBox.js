import { React, useState } from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const LoginBox = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	return (
		<form noValidate autoComplete="off">
			<FormControl>
				<InputLabel htmlFor="component-outlined">Username</InputLabel>
				<OutlinedInput
					id="component-outlined"
					value={username}
					onChange={handleUsernameChange}
					label="Username"
				/>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="component-outlined">Password</InputLabel>
				<OutlinedInput
					id="component-outlined"
					value={password}
					onChange={handlePasswordChange}
					label="Password"
				/>
			</FormControl>
		</form>
	);
};

export default LoginBox;
