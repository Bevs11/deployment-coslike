const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const promotionRoute = require("./routes/promotions");

const multer = require("multer");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "public/images");
  },
  filename: (request, file, cb) => {
    cb(null, request.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/v1/upload", upload.single("file"), (request, response) => {
  try {
    return response.status(200).send({ message: "File uploaded successfully" });
  } catch (error) {
    console.log(error);
  }
});
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/promotions", promotionRoute);

app.listen(process.env.PORT, () => {
  console.log(`Backend server is listening to port ${process.env.PORT}`);
});
