# Gmail App

This is a simple Node.js application that uses Google's Gmail API to send emails. The application is built with Express.js and uses OAuth2 for authentication.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```
git clone <repository-url>
cd <repository-name>
npm install
```

## Environment Variables

Create a `.env` file and copy variables from `.env.example` file and replace your values:

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

REDIRECT_URI=
```

## Running the Application

You can run the application using the following command:

```
npm run dev
```

This will start the server on port 3000.

## Usage

The application provides two main routes:

1. `/auth/login``: This route redirects the user to Google's OAuth2 consent screen.
2. `/auth/callback``: This route handles the OAuth2 callback and retrieves the access and refresh tokens.

Once authenticated, you can use the `/email/send` **POST** route to send an email. This route requires the access and refresh tokens obtained from the OAuth2 process.

## Note

This is a fun project and should not be used for sending spam or unsolicited emails. Always respect the privacy and rights of others when sending emails.

## Contributing

Contributions are welcome. Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the ISC License.