const express = require('express');
const cors = require('cors');
// const multer = require('multer');

const app = express();
const port = 4500;
const userRoutes = require('./routes/usersFile.js');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public')); 
app.use('/', userRoutes);




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
