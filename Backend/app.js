const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./Connection/Connection");

const app = express();
app.use(cors());  // ✅ Move CORS to the top
app.use(express.json());

const UserApi = require("./route/user");
const TaskApi = require("./route/task");

app.use("/api/v1", UserApi);
app.use("/api/v2", TaskApi);

const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
