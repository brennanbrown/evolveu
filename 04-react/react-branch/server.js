const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || "5000";

app.use(express.static(__dirname + "/build", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Express Server is Listening on port ${port}!`);
});
