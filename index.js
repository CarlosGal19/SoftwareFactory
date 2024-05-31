const express = require('express');

const postRoutes = require('./routes/postRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const forumRoutes = require('./routes/forumRoutes.js');

const app = express();

require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forums', forumRoutes);

app.get('/', (req, res) => {
    res.send({'Hello World': 'Welcome to the API'});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
