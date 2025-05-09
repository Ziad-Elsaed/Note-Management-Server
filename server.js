const express = require("express");
const app = express();
const authRoutes = require("./routes/user");
const noteRoutes = require("./routes/note");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors())

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "server error";
    res
        .status(statusCode)
        .json({
            from: "Error from general handling middleware",
            error: err,
            message: message,
        });
});

// catch all middlewares
app.use("*", (req, res) => {
    res.sendStatus(404);
});

const port = process.env.port || 3000;
mongoose.connect(process.env.DATA_BASE)
    .then(() => {
        app.listen(port || 3000, () =>
            console.log(
                `app listen on ${port} and connected to database sucessfully`
            )
        );
    })
    .catch((err) => console.log(`cannot connect to mongodb: ${err}`));
