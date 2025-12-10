import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

// create user
const createUser = async(payload: Record<string,unknown>) =>{
    const {name,email,password,phone,role} =payload;
    const hashedPass = await bcrypt.hash(password as string,10);

    const result = await pool.query(
    `INSERT INTO users(name,email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashedPass ,phone, role]);
return result;
}

// get all user
const getUser = async()=>{
    const result = await pool.query(`SELECT * FROM  users`);
    return result;
}

// update user 
const updateUser =async(payload: Record<string, unknown>,userId: string)=> {
    const {name,email, password, phone, role}=payload;
    const result = await pool.query(`UPDATE users SET name = $1, email = $2, password = $3, phone = $4, role = $5 WHERE id = $6 RETURNING *`,[name, email, password, phone, role, userId]);
    return result
}
  
// delete user
const deleteUser = async(userId: string)=>{
const result = await pool.query(`DELETE FROM users WHERE id=$1`,[userId]);
return result;
}

export const userService = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}