const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    console.log("REQUEST ON '/'");
    res.send("HELLO FROM BACKEND");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));