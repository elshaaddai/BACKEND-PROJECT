const http = require("http");
const express = require("express");
const routers = require("./routers");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// api client
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(routers);

const hostname = "127.0.0.1";
const port = 5000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://localhost:${port}`)
);
