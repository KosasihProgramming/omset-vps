import express from "express";
import cors from "cors";

import KemilingRoute from "./src/routes/KemilingRoute.js";
import GadingRoute from "./src/routes/GadingRoute.js";
import RajabasaRoute from "./src/routes/RajabasaRoute.js";

const app = express();
const port = 5555;

app.use(cors());
app.use(express.json());

app.use(KemilingRoute);
app.use(GadingRoute);
app.use(RajabasaRoute);

app.listen(port, () => {
  console.log(`Jalan uy di port: ${port}`);
});
