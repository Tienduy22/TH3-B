const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const Router = require("./api/routes/index.route");
const cookieParser = require("cookie-parser");
dbConnect();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
Router(app);


app.listen(8081, () => {
  console.log("server listening on port 8081");
});
