const express = require('express');
const { home } = require('./controllers/home.js');
const posts = require('./routers/posts.js');

const app = express();

app.use(express.static('public'));

//general route with home controllers
app.get('/', home);

// /posts route with router and controllers
app.use('/posts', posts);

app.listen(3000, (req, res) => {
    console.log(`Server avviato su: http://localhost:3000`);
})