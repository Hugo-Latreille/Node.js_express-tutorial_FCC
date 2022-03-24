const authorize = (req, res, next) => {
	const { user } = req.query;
	if (user === "Brigitte") {
		req.user = { name: "Brigitte", id: 2 };
		next();
	} else {
		res.status(401).send("Non autorisé");
	}

	console.log("authorize");
	next();
};

module.exports = authorize;
