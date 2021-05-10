import express, { Request, Response, NextFunction } from 'express';
// rest of the code remains same

import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import SocPrintCommands from "./socprint-commands";


const UPLOAD_PATH = "./uploads"


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("common"))

app.use(fileUpload({
  createParentPath: true
}))
const PORT = 8000;

app.post("/print", async (req:Request, res:Response) => {
  try {
    if(!req.files){
      res.send({
        status: false,
        message: "No files"
      })
      return;
    } else {
      const file = req.files.file;
      if (Array.isArray(file)) {
      res.send({
        status: false,
        message: "Expected single file"
      })
      return;
      } else {
        const newFilePath = `${UPLOAD_PATH}/${file.name}`
        await file.mv(newFilePath);
        const result = await SocPrintCommands.print({sunfireId: req.body.sunfire_id, password: req.body.password}, req.body.printer, newFilePath);
        fs.unlinkSync(newFilePath)
        res.send({
          status: true,
          message: result
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