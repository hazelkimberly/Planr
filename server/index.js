import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import '../database/index.js';
import todoRoutes from './todoRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/todo', todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
