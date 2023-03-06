import express from 'express'
import connectDb from './config/ConnectDB.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv'
const app = express();
app.use(express.json());
dotenv.config()
console.log(process.env.DATABASE_URL)
const db_url = process.env.DATABASE_URL 
 
connectDb(db_url).then((res)=>console.log(res))
const port = process.env.PORT
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/auth',authRouter)
app.use('/users/',userRouter)

app.listen(port, () => {
  console.log('Example app listening on port 5000!');
});
