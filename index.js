const express = require('express');

const userRoutes = require('./routes/userRoutes.js');
const forumRoutes = require('./routes/forumRoutes.js');
const majorRoutes = require('./routes/majorRoutes.js');
const userTypeRoutes = require('./routes/userTypeRoutes.js');

const app = express();

require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/users', userRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/majors', majorRoutes);
app.use('/api/user-types', userTypeRoutes);

app.get('/', (req, res) => {
    res.send({'Hello World': 'Welcome to the API'});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
