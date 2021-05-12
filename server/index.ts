import express, { Request, Response, NextFunction } from 'express';
import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import SocPrintCommands from "./socprint-commands";
import ServerStatus from "./sever_status";


const UPLOAD_PATH = "./uploads"


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("common"))
//TODO: Try useTempFiles option
app.use(fileUpload({
  createParentPath: true
}))
const PORT = 8000;

app.get("/ping", async (req: Request, res: Response) => {
  res.send("pong")
})

app.get("/sunfire_up", async (req: Request, res: Response) => {
  // Checks the tunnel connection between sunfire and DO
  res.send(await ServerStatus.get_server_status());
})

app.post("/print", async (req: Request, res: Response) => {
  if (!req.files) {
    res.status(400).send("No files sent for printing")
    return;
  }

  const file = req.files.file;
  if (Array.isArray(file)) {
    res.status(400).send("Expected single file")
    return;
  }

  try {
    const newFilePath = `${UPLOAD_PATH}/${file.name}`
    await file.mv(newFilePath);
    const result = await SocPrintCommands.print({ sunfireId: req.body.sunfire_id, password: req.body.password }, req.body.printer, newFilePath);
    fs.unlinkSync(newFilePath)
    res.send(result)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at port ${PORT}`);
});