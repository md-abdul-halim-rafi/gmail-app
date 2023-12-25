// routes/auth.ts

import express from "express";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI } from "../consts";

const router = express.Router();

const auth = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

router.get("/login", (req, res) => {
  const authorizeUrl = auth.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/gmail.send"],
  });
  res.redirect(authorizeUrl);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    const { tokens } = await auth.getToken(code);
    // Save tokens securely for later use
    res.json(tokens);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.response);
  }
});

export default router;
