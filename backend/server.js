require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");
const http = require("http");

const createAndListen = () => {
  const PORT = process.env.PORT || 5000;

  const server = http.createServer(app);

  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
      console.log("MongoDB Connected");
      server.listen(PORT, "0.0.0.0", () => {
        console.log(`Server Running on port ${PORT}`);
      });

      process.on("SIGINT", () => {
        mongoose.disconnect().then(() => {
          console.log("MongoDB Disconnected");
          server.close(() => {
            console.log("Shutting Down server...");
          });
          process.exit(0);
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

createAndListen();
