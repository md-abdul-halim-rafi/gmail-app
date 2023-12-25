import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OAUTH_SCOPES, REDIRECT_URI } from "../consts";

const auth = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

export const getAuthURL = () => {
  const authorizeUrl = auth.generateAuthUrl({
    access_type: "offline",
    scope: OAUTH_SCOPES,
  });
  return authorizeUrl;
};

export const googleAuthCallback = async (code: string) => {
  try {
    const { tokens } = await auth.getToken(code);
    return { status: 200, data: tokens };
  } catch (error: any) {
    console.error(error.response);
    return { status: 500, data: { message: "Internal Server Error" } };
  }
};
