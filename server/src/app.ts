import express, { Application, Request, Response } from 'express';
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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});