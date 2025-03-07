import express from "express";
import { createJournal, getJournals } from "../controllers/journal.controller.js";
import { protectRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post('/create' ,protectRoute, createJournal)
router.get('/journals' ,protectRoute, getJournals)

export default router;