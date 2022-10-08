const express = require('express');
const router = express.Router();
const db = require('../config/db');

// image
const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
        destination:(req, file, cb)=>{
            return cb (null, "./public/images");
        },
        filename:(req, file,cb)=>{
            cb(null, Date.now() + "--" + file.originalname);
        },
    });  




// img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image") ) {
        callback(null, true)
    } else {
        callback(null, Error("only image is allowd"))
    }
}


const upload = multer({
    storage: storage,
    fileFilter: isImage
})

router.get('/' ,(req, res)=>{
    return res.sendFile('index.html', {root:__dirname});
}
)


router.get('/employee', (async (req, res) => {
    let SqlQuery = `SELECT * FROM employee`;
    db.query(SqlQuery, (err, result) => {
        if (result) {
            res.send(result);
        } else {
            return res.status(200).json({ message: 'item was created', SqlQuery })
}
    })
}));
router.post('/register', upload.single('image'), (req, res) => {
    const { name, email, phone } =  req.body;
    const { filename } = req.file;
    console.log('req.file', req.file);
   
    try {
        // connected database code here....
        const sqlInsert = `INSERT INTO employee (name,image, email, phone) VALUES ('${name}','${filename}',
        '${email}',${phone})`
        db.query(sqlInsert, (err, result) => {
            if (result) {
                res.send(result)
            }    
            else {
                console.log("data added")
                res.status(201).json({ status: 201, data: req.file, file:req.body })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});


module.exports = router;