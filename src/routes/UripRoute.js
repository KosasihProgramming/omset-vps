import express from "express";
import {
  getPendapatan,
  indexBulanan,
  storeBulanan,
  storeHarian,
  updateBulanan,
  run,
} from "../controllers/UripController.js";

const router = express.Router();

router.get("/urip/pendapatan", getPendapatan);
router.get("/urip/pendapatan/bulanan", indexBulanan);
router.get("/urip/pendapatan/bulanan/store", storeBulanan);
router.get("/urip/pendapatan/bulanan/update", updateBulanan);
router.get("/urip/pendapatan/harian/store", storeHarian);
router.get("/urip/run", run);

export default router;
