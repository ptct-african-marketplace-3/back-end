const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require("cors");

const itemsRouter = require("./items/items-router");
const usersRouter = require("./users/users-router");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);

module.exports = app;