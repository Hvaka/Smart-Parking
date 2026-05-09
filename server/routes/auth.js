
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login",(req,res)=>{
  const {username,password} = req.body;

  if(username==="admin" && password==="1234"){
    const token = jwt.sign({role:"owner"}, "secret");
    return res.json({token,role:"owner"});
  }

  if(username==="emp" && password==="1234"){
    const token = jwt.sign({role:"employee"}, "secret");
    return res.json({token,role:"employee"});
  }

  res.status(401).send("Invalid");
});

export default router;
