const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('test');
})

app.listen(3000, (req, res) => {
    console.log(`Server avviato su: http://localhost:3000`);
})