"use strict";
const express = require('express');
const cors = require("cors");
require('dotenv').config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const connectDb = require('./config/db');
const port = process.env.PORT || 5000;
const app = express();
connectDb();
app.use(cors());
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV = 'development'
}));
app.listen(port, console.log(`server is running at port ${port}`));
