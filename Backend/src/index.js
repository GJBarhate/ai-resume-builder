import app from "./app.js";
import { connectDB } from "./db/index.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 5001; // fallback for local dev

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
