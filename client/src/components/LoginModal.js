import { React, useState } from "react";
import { Box, Tabs, Tab, Modal } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import LoginBox from "./LoginBox";

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
			<div className="modalContent">
				<h2 className="modalTitle">
					Welcome to Eatsy - the easiest way to track your meal prep!
				</h2>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs onChange={handleChange} aria-label="login tabs">
							<Tab label="Sign In" value="1" />
							<Tab label="Sign Up" value="2" />
						</Tabs>
					</Box>
					<TabPanel value="1">
						<LoginBox />
					</TabPanel>
					<TabPanel value="2">Item Two</TabPanel>
				</TabContext>
			</div>
		</Modal>
	);
};

export default LoginModal;
