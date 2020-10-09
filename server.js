import express, { json } from 'express';
import connectDB from './config/db';
const app = express();

app.get('/', (req, res) => res.send('API running'));

// Connect database
connectDB();

// Init Middleware
app.use(json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server connected on PORT ${PORT}`));
