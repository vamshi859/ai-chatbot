import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"
import morgan from 'morgan'

//connections and listeners

const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT,() => {
    console.log("Server open & connected to the MongoDB!");
  })
}).catch((error) => {
  console.log(error);
})