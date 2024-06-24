const express = require('express');
const cors = require('cors');
const swaggerDocs = require('./swaggerConfig/swagger.js');

const userRoutes = require('./routes/userRoutes.js');
const forumRoutes = require('./routes/forumRoutes.js');
const majorRoutes = require('./routes/majorRoutes.js');
const userTypeRoutes = require('./routes/userTypeRoutes.js');
const topicRoutes = require('./routes/topicRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const friendRequestRoutes = require('./routes/friendRequestRoutes.js');
const friendRoutes = require('./routes/friendRoutes.js');

const app = express();

app.use(cors());

require('dotenv').config();

const allowDomains = [
    process.env.FRONTEND_URL
];

const corsOptions = {
    origin: allowDomains,
    optionsSuccessStatus: 200
};

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/users', userRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/majors', majorRoutes);
app.use('/api/user-types', userTypeRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/friend-requests', friendRequestRoutes);
app.use('/api/friends', friendRoutes);

app.get('/', (req, res) => {
    res.send({'Hello World': 'Welcome to the API'});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    swaggerDocs(app, PORT);
});
