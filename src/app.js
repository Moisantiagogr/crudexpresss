import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
const app = express();

// Settings
app.set('port', process.env.PORT || 3001);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;