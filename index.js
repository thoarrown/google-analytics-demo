const express = require("express");
const ga = require("./analytics");
const app = express();
const port = 3333;
var key = require("./secret.json");

const reportRequests = {
	reportRequests: [
		{
			viewId: "208598862",
			dateRanges: [
				{
					endDate: "2020-02-03",
					startDate: "2020-02-01"
				}
			],
			metrics: [
				{
					expression: "ga:sessions"
				}
			],
			dimensions: [
				{
					name: "ga:sessionDurationBucket"
				},
				{
					name: "ga:date"
				}
			]
		}
	]
};
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/analytics", (req, res) => {
	var data = {};
	ga.auth(key).then(
		ga.query(reportRequests).then(function(error, results) {
			var csv = ga.makecsv(error, results);
			data = csv;
			res.send(data);
		})
	);
	console.log("ga.query(", data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
var http = require("http");
// var fs = require("fs");

// const PORT = 3333;

// fs.readFile("./index.html", function(err, html) {
// 	if (err) throw err;

// 	http
// 		.createServer(function(request, response) {
// 			response.writeHeader(200, { "Content-Type": "text/html" });
// 			response.write(html);
// 			response.end();
// 		})
// 		.listen(PORT);
// });
