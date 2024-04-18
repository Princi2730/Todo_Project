require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes')

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', taskRouter);
app.use('/', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
