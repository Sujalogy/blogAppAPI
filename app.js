const express = require('express');
const bodyParser = require('body-parser');

const { connection } = require('./database/db');
const { userRouter } = require('./routes/user.routes');
const { blogRouter } = require('./routes/blog.routes');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.listen(3000, async () => {
    try {
        console.log("server is running...");
        await connection;
        console.log("DB Connected...");
    } catch (error) {
        console.log("DB not Connected...");
    }
})