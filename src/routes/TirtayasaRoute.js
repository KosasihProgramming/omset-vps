import express from "express";
import {
  getPendapatan,
  indexBulanan,
  storeBulanan,
  storeHarian,
  updateBulanan,
  run,
} from "../controllers/TirtayasaController.js";

const router = express.Router();

router.get("/tirtayasa/pendapatan", getPendapatan);
router.get("/tirtayasa/pendapatan/bulanan", indexBulanan);
router.get("/tirtayasa/pendapatan/bulanan/store", storeBulanan);
router.get("/tirtayasa/pendapatan/bulanan/update", updateBulanan);
router.get("/tirtayasa/pendapatan/harian/store", storeHarian);
router.get("/tirtayasa/run", run);

export default router;
