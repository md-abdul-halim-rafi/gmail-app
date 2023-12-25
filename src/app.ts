import express from "express";
import authRoutes from "./routes/auth";
import emailRoutes from "./routes/email";

const app = express();

app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
