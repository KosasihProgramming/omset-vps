import express from "express";
import {
  getPendapatan,
  indexBulanan,
  storeBulanan,
  storeHarian,
} from "../controllers/KemilingController.js";

const router = express.Router();

router.get("/kemiling/pendapatan", getPendapatan);
router.get("/kemiling/pendapatan/bulanan", indexBulanan);
router.get("/kemiling/pendapatan/bulanan/store", storeBulanan);
router.get("/kemiling/pendapatan/harian/store", storeHarian);

export default router;
