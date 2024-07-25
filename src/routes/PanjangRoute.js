import express from "express";
import {
  getPendapatan,
  indexBulanan,
  storeBulanan,
  storeHarian,
  updateBulanan,
  run,
} from "../controllers/PanjangController.js";

const router = express.Router();

router.get("/panjang/pendapatan", getPendapatan);
router.get("/panjang/pendapatan/bulanan", indexBulanan);
router.get("/panjang/pendapatan/bulanan/store", storeBulanan);
router.get("/panjang/pendapatan/bulanan/update", updateBulanan);
router.get("/panjang/pendapatan/harian/store", storeHarian);
router.get("/panjang/run", run);

export default router;
