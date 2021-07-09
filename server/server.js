const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
	// perform a database connection when server starts
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
	});
	console.log(`Server is running on port: ${port}`);
});
