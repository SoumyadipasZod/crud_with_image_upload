const express = require('express');
const path = require('path');
const ejs =require('ejs');
const mongoose = require('mongoose');
const multer = require('multer');
const dbDriver ="mongodb+srv://Soumyadip:Panja21031998@cluster0.cf1ge.mongodb.net/myblog"




const app = express();
app.set('view engine', 'ejs')
app.set('views','views')

//stape2 fileupload
app.use('/upload',express.static(path.join(__dirname,'upload')));

//stape3
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

//stape4 file type
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    }
    else{
        cb(null,false)
    }    
} 

// step-5
app.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))

app.use(express.urlencoded({ extended:true }));

// route
const UserRoute = require('./Route/UserRoute')
app.use(UserRoute)

// define API Route
const ApiRoute = require('./Route/ApiRoute')
app.use('/api/',ApiRoute)



// define port
const port = process.env.PORT || 2002
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result => {
    app.listen(port,()=>{
        console.log(`server running at http://localhost:${port}`)
        console.log(`Database connected`)
    })
}).catch(err => {
    console.log(`connection failed`)
})