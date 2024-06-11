const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
let dataArray = [];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// POST METHOD
router.post('/api/users', upload.single('profileImage'), (req, res) => {
    try {
        const { name, email, password, rollNumber } = req.body;
        const profileImage = req.file ? `/uploads/${req.file.filename}` : null;
        let id;

        do {
            id = Math.floor(Math.random() * 100);
        } while (dataArray.some(user => user.id === id));

        const newUser = { id, name, email, password, rollNumber, profileImage };
        dataArray.push(newUser);

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// GET METHOD
router.get('/', (req, res) => {
    console.log("====>", dataArray);
    res.render('user', { users: dataArray });
});

// PUT METHOD

router.put('/:id', (req, res) => {

    const {id}=req.params;
    const {name,email,password,rollNumber}=req.body;

    const userIndex=dataArray.findIndex((el)=>el.id===id);

    if(userIndex===-1)
        {
            res.status(404).json({massage:'Data Not Found'});
        }

    dataArray[userIndex]={ id, name, email, password, rollNumber };
    res.json(dataArray[userIndex]);  
});

// DELETE METHOD


router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const userIndex = dataArray.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        dataArray.splice(userIndex, 1);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
