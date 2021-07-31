import React from "react";
import Loader from "react-loader-spinner";
import { Modal } from "@material-ui/core";
import { usePromiseTracker } from "react-promise-tracker";
import "./LoadingIndicator.css";

const LoadingIndicator = (props) => {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress && (
			<Modal open={true}>
				<div className="modalContent" id="loader-modal">
					<Loader type="ThreeDots" color="#007769" height="100" width="100" />
					<p id="loader-text">Connecting to server...</p>
				</div>
			</Modal>
		)
	);
};

export default LoadingIndicator;
