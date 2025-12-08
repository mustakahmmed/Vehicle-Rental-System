import express, { Request, Response } from "express";
const app = express()
// import { Pool } from "pg";
// import config from "./config";


// const pool = new Pool({connectionString:`${config.connection_str}`})

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})
export default app;