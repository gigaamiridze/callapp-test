import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './config';
import { userRouter } from './routes';

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Route middleware
app.use('/api/v1', userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});