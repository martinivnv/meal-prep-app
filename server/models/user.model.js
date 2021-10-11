const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: [4, "Username must be at least 4 characters long"],
		maxLength: [15, "Username cannot be longer than 15 characters"],
	},
	password: {
		type: String,
		required: true,
		minLength: [6, "Password must be at least 6 characters long"],
		maxLength: [15, "Password cannot be longer than 15 characters"],
	},
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
