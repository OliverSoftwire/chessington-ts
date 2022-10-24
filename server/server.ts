import express from "express";
import { join } from "path";

const app = express();

app.use(express.static(join(__dirname, "../public")));

const port = 3000;
const hostname = "localhost";

app.listen(port, hostname, () => {
	console.log(`API is running at ` + `http://${hostname}:${port}`);
});
