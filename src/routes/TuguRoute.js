import express from "express";
import {
  getPendapatan,
  indexBulanan,
  storeBulanan,
  storeHarian,
  updateBulanan,
  run,
} from "../controllers/TuguController.js";

const router = express.Router();

router.get("/tugu/pendapatan", getPendapatan);
router.get("/tugu/pendapatan/bulanan", indexBulanan);
router.get("/tugu/pendapatan/bulanan/store", storeBulanan);
router.get("/tugu/pendapatan/bulanan/update", updateBulanan);
router.get("/tugu/pendapatan/harian/store", storeHarian);
router.get("/tugu/run", run);

export default router;
