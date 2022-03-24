const express = require("express");
const app = express();
const logger = require("./logger");

app.use(logger);

app.get("/", (req, res) => {
	res.send("Home");
});

app.get("/about", (req, res) => {
	res.send("About");
});

app.get("/api", (req, res) => {
	res.send("Api");
});

app.listen(5000, () => {
	console.log("Serveur lancé sur le port 5000");
});
