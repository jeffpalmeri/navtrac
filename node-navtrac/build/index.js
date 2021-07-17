"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var readLastLine = require("read-last-line");
var app = express_1.default();
var port = 4000;
var middle = function (req, res, next) {
    console.log("This is middleware!");
    next();
};
app.use(function (req, res, next) { return middle(req, res, next); });
// app.get("/users", (req: Request, res: Response) => {
//   console.info("Req params: ", req.query);
//   res.send("Hello world!");
// });
// app.get("/yes", (req: Request, res: Response) => {
//   res.json({ jeff: "my name" });
// });
app.get("/records", function (req, res) {
    // res.send("Record has been recieved");
    // Make request to our 'database'
    // Get the 100 most recent lines
    // Return these lines to the client
    readLastLine
        .read("sample.txt", 2)
        // .read("sample.csv", 2)
        .then(function (lines) {
        console.log(lines);
        var lastLines = lines.split(/\r?\n/);
        console.log("*******", lastLines);
        res.json({ lines: lastLines });
    })
        .catch(function (err) {
        console.log(err.message);
    });
});
app.get("/records/:id_or_key", function (req, res) {
    console.info("Req query: ", req.params);
    var id_or_key = req.params.id_or_key;
    res.send(id_or_key);
});
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
