// services/gmail.ts

import { google } from 'googleapis';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI } from "../consts";
import { OAuth2Client } from "google-auth-library";
import { OAuthTokens } from "../types";

const gmail = google.gmail('v1');

const getAuth = (tokens: OAuthTokens) => {
  // Assume you have the tokens object from OAuth2 authentication
  const { access_token, refresh_token, expiry_date } = tokens;
  
  // Set up the OAuth2 client with tokens
  const auth = new OAuth2Client({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
    credentials: {
      access_token,
      refresh_token,
      expiry_date,
    },
  });

  return auth;
}

const refreshToken = async (tokens: OAuthTokens) => {
  const auth = getAuth(tokens);

  // Refresh the tokens
  const refreshedTokens = await auth.refreshAccessToken();

  // Update the tokens in the database if needed
  // database.set('tokens', refreshedTokens.credentials);

  return refreshedTokens.credentials;
}

const isTokenExpiring = (expiry_date: number) => {
  const expiry = new Date(expiry_date);
  const now = new Date();
  return now > expiry;
}

export async function sendEmail(tokens: OAuthTokens, to: string, subject: string, body: string): Promise<any> {
  const raw = makeRawMessage(to, subject, `<html><p>${body}</p> <br /> <p>Powered by www.octolane.com</p></html>`);

  const auth = getAuth(tokens);

  if (isTokenExpiring(tokens.expiry_date)) {
    await refreshToken(tokens);
  }

  try {
    const mailResponse = await gmail.users.messages.send({
      auth,
      userId: 'me',
      requestBody: {
        raw,
      },
    });
    return mailResponse;
  } catch (error: any) {
    console.error(error);
    return error.response;
  }
}

function makeRawMessage(to: string, subject: string, body: string): string {
  const emailLines = [
    `To: ${to}`,
    'MIME-Version: 1.0',
    'Content-type: text/html;charset=iso-8859-1',
    `Subject: ${subject}`,
    '',
    body,
  ];
  return Buffer.from(emailLines.join('\r\n')).toString('base64');
}
