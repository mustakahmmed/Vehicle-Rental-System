import express, { Request, Response } from "express";
import { userRouter } from "./modules/users/user.routes";
import initDB from "./config/db";
// import { vehiclesRouter } from "./modules/vehicles/vehicles.routes";
const app = express()
// import { Pool } from "pg";
// import config from "./config";
initDB()

app.use(express.json())
app.use("/api/v1/users",userRouter)
// app.use("/api/v1/vehicles",vehiclesRouter)


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


export default app;