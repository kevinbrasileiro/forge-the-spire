import express, { Request, Response} from "express";
import cors from "cors"

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"]
}));
app.use(express.json({
  limit: "8mb"
}));

app.post("/api/build", (req: Request, res: Response) => {
  res.json(req.body);
});

app.listen(3000, () => {
  return console.log("Express is listening at http://localhost:3000");
});