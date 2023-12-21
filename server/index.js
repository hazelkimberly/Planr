import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import '../database/index';
import scheduleRoutes from './scheduleRoutes';
import todoRoutes from './todoRoutes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/schedule', scheduleRoutes);
app.use('/todo', todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
