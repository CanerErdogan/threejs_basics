const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// app.get('/src/main.js', (req, res) => {
//     res.sendFile(path.join(__dirname + '/src/main.js'));
// });

app.get('/src/:file', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/' + req.params.file));
});

app.get('/node_modules/three/build/three.module', (req, res) => {
    res.sendFile(path.join(__dirname + '/node_modules/three/build/three.module.js'));
});

app.get('/node_modules/three/build/three.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/node_modules/three/build/three.js'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/style.css'));
});

PORT = 4444
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
