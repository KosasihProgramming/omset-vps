import express from "express";
import cors from "cors";

import KemilingRoute from "./src/routes/KemilingRoute.js";
import GadingRoute from "./src/routes/GadingRoute.js";
import RajabasaRoute from "./src/routes/RajabasaRoute.js";
import UripRoute from "./src/routes/UripRoute.js";
import TuguRoute from "./src/routes/TuguRoute.js";
import TirtayasaRoute from "./src/routes/TirtayasaRoute.js";

const app = express();
const port = 5555;

app.use(cors());
app.use(express.json());

app.use(KemilingRoute);
app.use(GadingRoute);
app.use(RajabasaRoute);
app.use(UripRoute);
app.use(TuguRoute);
app.use(TirtayasaRoute);

app.listen(port, () => {
  console.log(`Jalan uy di port: ${port}`);
});
