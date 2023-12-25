import express from "express";

import { getAuthURL, googleAuthCallback } from "../services/oauth";

const router = express.Router();

router.get("/login", (req, res) => {
  const authorizeUrl = getAuthURL();
  res.redirect(authorizeUrl);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code as string;
  const result = await googleAuthCallback(code);
  res.status(result.status).json(result.data);
});

export default router;
