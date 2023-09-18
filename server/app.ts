import express, { Request, Response } from "express";
const app = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
    res.send("cool!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port} ⚡️`);
});
