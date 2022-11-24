import express, {json} from 'express';
import cors from 'cors';
import isLoggedIn from './routes/isLoggedIn.js';
import authRouter from './routes/auth-routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {credentials:true, origin: '*'};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

// app get hi 

app.get('/', (req, res) => {
  res.send('Hi');
});


app.use('/api/auth',authRouter);
app.use('/api/checkauth', isLoggedIn);


app.listen(PORT, ()=> {
  console.log(`Server is listening on port:${PORT}`);
})