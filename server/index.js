const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { performCalculations } = require("./controller");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

    console.log(`${req.method}:  ${fullUrl}`);
    next();
});

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/muskingum", function (req, res) {
    const input = req.body;
    const values = Object.entries(input);
    console.log(values);
    res.status(200).json({
        status: true,
        values,
    });
});

app.post("/calculate", (req, res) => {
    const { timeValues, inflowValues, outflowValues, weightFactor } = req.body;
    const results = performCalculations(
        timeValues,
        inflowValues,
        outflowValues,
        weightFactor
    );

    res.status(200).json({
        status: true,
        results,
    });
});

app.all("*", (req, res) => {
    res.status(404).json({
        status: false,
        message: "Page not found",
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
