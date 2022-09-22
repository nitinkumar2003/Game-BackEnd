const express=require('express');
const cors=require('cors');
require('./db/config');
const User=require('./db/User');
const Contacts=require('./db/Contacts');
const app=express();

app.use(express.json())
app.use(cors());

//SinUp
app.post("/signup",async(req,resp)=>{
    let user=new User(req.body)
    let result=await user.save();
    resp.send(result)
})


//Contact Us
app.post("/contacts",async(req,resp)=>{
    let contact=await Contacts(req.body);
    let result= await contact.save();
    resp.send(result)
})


// Login Route-
app.post("/login",async(req,resp)=>{
    if(req.body.password && req.body.email){
        let user=await User.findOne(req.body).select("-password")
        if(user){
            resp.send(user)
        }else{
            resp.send({result:"No User Found"})
        }
    }else{
        resp.send({result:"No User Found"})
    }
})


//Get Data
app.get("/dashboard",async(req,resp)=>{
    let user=await User.find();
    if(user.length>0){
        resp.send(user)
    }else{
        resp.send({rersult:"No Data Found"})
    }
})


//Delete Dashboard Api

app.delete("/dashboard/:id",async(req,resp)=>{
    const result= await User.deleteOne({_id:req.params.id})
    resp.send(result);
 });


//Get Single Data for Preffil Data
app.get("/dashboard/:id",async(req,resp)=>{
    let result=await User.findOne({_id:req.params.id})
    if(result){
        resp.send(result)
    }else{
        resp.send({result:"NO record Found"})
    }
})

//Route For Updata DB
app.put("/dashboard/:id",async(req,resp)=>{
    let result =await User.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result)
})



//Seacch Api 
app.get("/search/:key",async(req,resp)=>{
    let result=await User.find({
        "$or":[
        {name:{$regex:req.params.key}},
        {email:{$regex:req.params.key}}
        ]
    });
    resp.send(result)
})

app.listen(4000)