import express from "express";

import { sendEmail, getMails } from "../services/gmail";
import { OAuthTokens } from "../types";

const router = express.Router();

router.post("/send", async (req, res) => {
  const reqBody = req.body as OAuthTokens & { to: string; subject: string; body: string };

  if (!reqBody || !reqBody.access_token || !reqBody.refresh_token || !reqBody.expiry_date) {
    return res.status(400).send("Missing token");
  }

  const response = await sendEmail(
    {
      access_token: reqBody.access_token,
      refresh_token: reqBody.refresh_token,
      expiry_date: reqBody.expiry_date,
    },
    reqBody.to,
    reqBody.subject,
    reqBody.body
  );

  res.json(response);
});

router.post("/sync-mails", async (req, res) => {
  const reqBody = req.body as OAuthTokens;

  if (!reqBody || !reqBody.access_token || !reqBody.refresh_token || !reqBody.expiry_date) {
    return res.status(400).send("Missing token");
  }

  const response = await getMails(
    {
      access_token: reqBody.access_token,
      refresh_token: reqBody.refresh_token,
      expiry_date: reqBody.expiry_date,
    },
  );

  res.json(response);
});

export default router;
