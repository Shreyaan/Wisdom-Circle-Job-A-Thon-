import express from "express";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

/* checks if user is logged in */
router.get("/", authenticateToken, async (req, res) => {

  try {
    res.status(200).json('user is logged in') ;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
