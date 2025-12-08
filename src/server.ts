import app from "./app"
import config from "./config";
import initDB from "./config/db";
const port = config.port;

initDB()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
 
});

