import express from "express";
import {
  getPendapatan,
  indexBulanan,
  storeBulanan,
  storeHarian,
  updateBulanan,
  run,
} from "../controllers/GadingController.js";

const router = express.Router();

router.get("/gading/pendapatan", getPendapatan);
router.get("/gading/pendapatan/bulanan", indexBulanan);
router.get("/gading/pendapatan/bulanan/store", storeBulanan);
router.get("/gading/pendapatan/bulanan/update", updateBulanan);
router.get("/gading/pendapatan/harian/store", storeHarian);
router.get("/gading/run", run);

export default router;
