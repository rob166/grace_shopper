
import express from "express";
import chalk from 'chalk'
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(
        chalk.blueBright("Server is listening on PORT:"),
        chalk.yellow(PORT),);
});

