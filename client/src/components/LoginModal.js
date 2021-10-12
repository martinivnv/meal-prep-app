import { React, useState } from "react";
import { Box, Tab, Modal } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import LoginBox from "./LoginBox";
import SignupBox from "./SignupBox";
import "./LoginModal.css";

const LoginModal = () => {
	const [value, setValue] = useState("1");
	const [loginModalOpen, setLoginModalOpen] = useState(true);

	const handleChange = (e, newValue) => {
		setValue(newValue);
	};

	const handleClose = (e, reason) => {
		setLoginModalOpen(false);
	};

	return (
		<Modal
			open={loginModalOpen}
			onClose={(event, reason) => {
				if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
					handleClose(event, reason);
				}
			}}
			className="loginModal"
			aria-labelledby="login-modal"
			aria-describedby="signin-signup"
		>
			<div className="modalContent" id="loginModalContent">
				<h2 className="modalTitle">Welcome to Eatsy!</h2>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<TabList onChange={handleChange} aria-label="login tabs">
							<Tab label="Log In" value="1" className="loginModalTab" />
							<Tab label="Sign Up" value="2" className="loginModalTab" />
						</TabList>
					</Box>
					<TabPanel value="1" className="loginTabPanel">
						<LoginBox />
					</TabPanel>
					<TabPanel value="2" className="loginTabPanel">
						<SignupBox />
					</TabPanel>
				</TabContext>
			</div>
		</Modal>
	);
};

export default LoginModal;
