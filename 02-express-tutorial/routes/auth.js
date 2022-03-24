const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
	const { name } = req.body;
	if (name) {
		return res.status(200).send(`Bienvenue ${name} !`);
	}
	return res.status(401).send("Merci de vous identifier");
});

module.exports = router;
