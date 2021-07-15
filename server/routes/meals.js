const express = require("express");
const router = express.Router();

let Meal = require("../models/meal.model");

// READ all meals
router.route("/").get((req, res) => {
	Meal.find()
		.then((meals) => res.json(meals))
		.catch((err) => res.status(400).json("Error: " + err));
});

// CREATE a new meal
router.route("/add").post((req, res) => {
	const name = req.body.name;
	const portions = req.body.portions;
	const cost = Number(req.body.cost);
	const type = req.body.type;
	const date = Date.parse(req.body.date);

	const newMeal = new Meal({ name, portions, cost, type, date });

	newMeal
		.save()
		.then((meal) => res.json(meal._id))
		.catch((err) => res.status(400).json("Error: " + err));
});

// READ a meal by its ID
router.route("/:id").get((req, res) => {
	Meal.findById(req.params.id)
		.then((meal) => res.json(meal))
		.catch((err) => res.status(400).json("Error: " + err));
});

// DELETE a meal by its ID
router.route("/:id").delete((req, res) => {
	Meal.findByIdAndDelete(req.params.id)
		.then(() => res.json("Meal deleted."))
		.catch((err) => res.status(400).json("Error: " + err));
});

// UPDATE a meal by its ID
router.route("/update/:id").post((req, res) => {
	Meal.findById(req.params.id)
		.then((meal) => {
			meal.name = req.body.name;
			meal.portions = req.body.portions;
			meal.cost = Number(req.body.cost);
			meal.type = req.body.type;
			meal.date = Date.parse(req.body.date);

			meal
				.save()
				.then(() => res.json("Meal updated."))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
