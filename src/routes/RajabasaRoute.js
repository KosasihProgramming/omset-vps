import express from "express";
import {
  getPendapatan,
  indexBulanan,
  storeBulanan,
  storeHarian,
  updateBulanan,
  run,
} from "../controllers/RajabasaController.js";

const router = express.Router();

router.get("/rajabasa/pendapatan", getPendapatan);
router.get("/rajabasa/pendapatan/bulanan", indexBulanan);
router.get("/rajabasa/pendapatan/bulanan/store", storeBulanan);
router.get("/rajabasa/pendapatan/bulanan/update", updateBulanan);
router.get("/rajabasa/pendapatan/harian/store", storeHarian);
router.get("/rajabasa/run", run);

export default router;
