import express, { Request, Response, NextFunction } from "express";
const readLastLine = require("read-last-line");

const app = express();
const port = 4000;

const middle = (req: Request, res: Response, next: NextFunction) => {
  console.log("This is middleware!");
  next();
};

app.use((req, res, next) => middle(req, res, next));

// app.get("/users", (req: Request, res: Response) => {
//   console.info("Req params: ", req.query);
//   res.send("Hello world!");
// });

app.get("/records", (req: Request, res: Response) => {
  // res.send("Record has been recieved");
  // Make request to our 'database'
  // Get the 100 most recent lines
  // Return these lines to the client

  readLastLine
    .read("sample.txt", 2)
    .then((lines: any) => {
      console.log(lines);

      const lastLines = lines.split(/\r?\n/);
      console.log("*******", lastLines);

      res.json({ lines: lastLines });
    })
    .catch((err: any) => {
      console.log(err.message);
    });
});

app.patch("/records/:id_or_key", (req: Request, res: Response) => {
  // Did not finish implimenting this patch route
  console.info("Req query: ", req.params);
  const { id_or_key } = req.params;

  res.send(id_or_key);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
