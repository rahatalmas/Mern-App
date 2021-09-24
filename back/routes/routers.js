const express = require('express');
const router = express.Router();
const userRoutes = require('../controller/userRoutes');
const userModel = require('../models/userModel')
const postModel = require('../models/postModel');

router.post('/register',userRoutes.registerRoute);
router.post('/login',userRoutes.loginRoute);

router.get('/user/:name',(req,res)=>{
    const name=req.params.name;
    userModel.find({name:name})
     .then(result=>{
         res.json(result);
     })
     .catch(err=>{
         console.log(err);
     })
});
router.get('/allposts',(req,res)=>{
    postModel.find()
     .then(result=>{
         res.json(result);
     })
})
router.post('/post',(req,res)=>{
    const newPost = new postModel(req.body);
    newPost.save(req.body)
     .then(result=>{
         res.send(result);
     })
     .catch(err=>{
         res.send(err);
     })   
})
router.get('/posts/:name',(req,res)=>{
    const name = req.params.name;
    postModel.find({name:name})
     .then(post=>{
         res.send(post);
     })
     .catch(err=>{
             console.log(err);
     })   
})
router.get('/:id',(req,res)=>{
    postModel.findById(req.params.id)
     .then(result=>{
         res.json(result);
     })
     .catch(err=>{
        res.send(err);
    })
})

router.put('/:id',(req,res)=>{
    postModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
     .then(result=>{
         res.json(result);
     })
     .catch(err=>{
         console.log(err);
     })
})

router.delete('/:id',(req,res)=>{
    postModel.findByIdAndDelete(req.params.id)
     .then(result=>{
         res.json({message:"post deleted"});
     })
     .catch(err=>{
         console.log(err);
     })
})


module.exports = router;