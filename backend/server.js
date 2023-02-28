
const express = require("express")

const PORT = process.env.PORT || 3001;
const cors = require('cors')
const morgan = require("morgan")
const router = require('./api')
const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    // console.log('beginning router');

    next()
})

app.use("/api", router)

app.listen(PORT, () => {
    console.log(
        `Server is listening on:${PORT}`,
    );
});

