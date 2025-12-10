import { Request, Response } from "express";
import { userService } from "./user.service";


// user login
const createUser = async(req:Request,res:Response)=>{
try {
    const result = await userService.createUser(req.body);
    // console.log(result.rows[0]);
    // res.send({message:"data inserted"})
  res.status(201).json({
    success:true,
    message:"data inserted",
    data:result.rows[0]
  })
} catch (err:any) {
  res.status(500).json({
    success:false,
    message:err.message
  })
}  
}

// get all update
const getAllUser = async(req:Request,res:Response) =>{
 
  try {
     const result = await userService.getUser();
     res.status(200).json({
      success:true,
      message:"user recived succesfully",
      data:result.rows[0]
     })
  } catch (err:any) {
    res.status(500).json({
      success:false,
      message:err.message,
    })
  }
}

export const userController = {
    createUser,
    getAllUser
    
}