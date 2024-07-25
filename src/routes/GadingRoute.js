import express from "express";
import {
  getPendapatan,
  indexBulanan,
  storeBulanan,
  storeHarian,
} from "../controllers/GadingController.js";

const router = express.Router();

router.get("/gading/pendapatan", getPendapatan);
router.get("/gading/pendapatan/bulanan", indexBulanan);
router.get("/gading/pendapatan/bulanan/store", storeBulanan);
router.get("/gading/pendapatan/harian/store", storeHarian);

export default router;
