import { Request, Response } from "express";
import { userService } from "./user.service";
import { pool } from "../../config/db";


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
      data:result.rows
     })
  } catch (err:any) {
    res.status(500).json({
      success:false,
      message:err.message,
    })
  }
}

const updateUser = async(req:Request,res:Response)=>{
  
  
  try {
    const userId = req.params.id as string;
    const payload = req.body;
    const result = await userService.updateUser(payload,userId)
    if(result.rows.length === 0){
      res.status(404).json({
        success:false,
        message:"user not found"
      })
    }else{
      res.status(200).json({
        success:true,
        message:"user updated",
        data:result.rows[0]
      })
    }

  } catch (err:any) {
    res.status(500).json({
      success:false,
      message:err.message
    })

  }
}


// delete user
const deleteuser = async(req:Request,res:Response) => {
  console.log(req.params.id);
  
  try {
    const result = await userService.deleteUser(req.params.id!)
    if (result.rowCount === 0) {
      res.status(404).json({
        success:false,
        message:"user notfound"
      })
    } else {
      res.status(200).json({
        success: true,
        mesage:"user deleted",
        data:result.rows
      })
    }
  } catch (err: any) {
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export const userController = {
    createUser,
    getAllUser,
    updateUser,
    deleteuser
    
}