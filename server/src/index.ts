import dbConnet from './dbConnect.js';
import express, { Response } from 'express';
import config from './config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import error from './middlware/error.js';
import employeeRoutes from './employees/routes.js';
import departmentsRoutes from './departments/routes.js';
import countriesRoutes from './countries/routes.js';

await dbConnet();

const PORT = config.port || 5000;
const app = express();


app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.use('/api', employeeRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', countriesRoutes);
app.use('/api/health', (req, res: Response) => {
  res.send('health checked');
});

app.use(error);

app.listen(
  PORT
);

export default app;