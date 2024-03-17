require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const collabRoutes = require('./routes/collabRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const userRoutes = require('./routes/userRoutes');

const authenticateToken = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/collab', authenticateToken, collabRoutes);
app.use('/tasks', authenticateToken, tasksRoutes);
app.use('/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
