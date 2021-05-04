import express, { Request, Response, NextFunction } from 'express';
// rest of the code remains same

import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use(fileUpload({
  createParentPath: true
}))
const PORT = 8000;
app.get('/', (req, res) => res.send('Yo this is the API server go back to where you came from'));


app.post("/quota", async (req:Request, res:Response) => {
  try {
    if(!req.files){
      res.send({
        status: false,
        message: "No files"
      })
    } else {
      const picture = req.files.picture;
      if (Array.isArray(picture)) {
      res.send({
        status: false,
        message: "Expected single file"
      })
      } else {
        picture.mv("./uploads/" + picture.name)
        res.send({
          status: true,
          message: "File is uploaded"
        })
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e)
  }
})


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
