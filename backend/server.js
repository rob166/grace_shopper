
import express from "express";
import chalk from 'chalk'
const PORT = process.env.PORT || 3001;
import cors from 'cors'
import morgan from "morgan";
const router = express.Router()
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use((req,res,next)=>{
    // console.log('beginning router');
    
    next()
})

app.use("/api",router);
app.listen(PORT, () => {
    console.log(
        chalk.blueBright("Server is listening on PORT:"),
        chalk.yellow(PORT),);
});