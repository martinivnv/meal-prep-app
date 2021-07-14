const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mealSchema = new Schema({
	name: { type: String, required: true },
	portions: { type: Number, required: true },
	cost: { type: Number, required: true, min: 1, max: 3 }, // i.e. "$", "$$", or "$$$"
	type: { type: String, required: true }, // i.e. home-cooked, delivery, dining out
	date: { type: Date, required: true },
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
