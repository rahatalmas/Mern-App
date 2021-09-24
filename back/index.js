const express = require('express');
const mongoose = require('mongoose');
const PORT = 5000;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const multer = require('multer');
const path = require('path');

const db="mongodb+srv://rahatalmas:practicedatabase@practiceforprojects.f0dgw.mongodb.net/MemoryApp?retryWrites=true&w=majority";
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
 .then((result)=>{
    console.log('database connected.')
    app.listen(PORT,()=>{
        console.log("app is running");
     });
 })

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage});
app.post('/image/upload',upload.single("file"),(req,res)=>{
    res.send('file uploaded');
})

app.use('/images',express.static(path.join(__dirname,"images")));

const allroutes = require('./routes/routers');
app.use('/',allroutes);
    

