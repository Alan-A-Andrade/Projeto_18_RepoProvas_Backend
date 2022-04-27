import dotenv from 'dotenv'
import app from "./index.js"
dotenv.config()
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});