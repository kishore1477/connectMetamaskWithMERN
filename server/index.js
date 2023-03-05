import express from 'express'
import connectDb from './Config/ConnectDB.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
const app = express();
const db_url = process.env.Db_URL

(
  async()=>{
    await connectDb(db_url)
  }
)()

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/auth',authRouter)
app.use('/users',userRouter)

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
