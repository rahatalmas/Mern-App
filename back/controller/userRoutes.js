const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const registerRoute = (req,res,next)=>{
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password,10,(err,hash)=>{
        if(err){
            console.log(err);
        }
        const newUser = new userModel({name,password:hash})
        newUser.save()
         .then(result=>{
             res.json({message:"success"});
         })
         .catch(err=>{
             console.log(err);
         })
    });

}

const loginRoute = (req,res,next)=>{
    const name = req.body.name;
    const password = req.body.password;
    userModel.findOne({name})
     .then(result=>{
         if(result){
             bcrypt.compare(password,result.password,(err,r)=>{
                 if(r){
                    res.json({message:"success"});
                 }else{
                     res.json({message:"wrong password"});
                 }
             })
         }else{
             res.json({message:"user not found"});
         }
     })
     .catch(err=>{
         console.log(err);
     })
}

module.exports = {
    registerRoute,
    loginRoute
};