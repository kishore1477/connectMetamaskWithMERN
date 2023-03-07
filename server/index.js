import express from 'express'
import connectDb from './config/ConnectDB.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv'
import  cors from 'cors'
const app = express();
app.use(express.json());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
  
  "Access-Control-Allow-Origin":"*"
}

app.use(cors(corsOptions)) 
dotenv.config()
console.log(process.env.DATABASE_URL)
const db_url = process.env.DATABASE_URL 
 
connectDb(db_url).then((res)=>console.log(res))
const port = process.env.PORT
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/auth',authRouter)
app.use('/users',userRouter)

app.listen(port, () => {
  console.log('Example app listening on port 5000!');
});
