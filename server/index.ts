import express, { Request, Response} from 'express';
import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import SocPrintCommands from "./socprint-commands";
import ServerStatus from "./server-status";
import * as dotenv from 'dotenv';
dotenv.config();



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
  // Checks the tunnel connection between sunfire and DO is running
  res.send(await ServerStatus.get_server_status());
})

app.post("/print", async (req: Request, res: Response):Promise<void> => {
  if (!req.files) {
    res.status(400).send("No files sent for printing")
    return;
  }

  const file = req.files.file;
  if (Array.isArray(file)) {
    res.status(400).send("Expected single file")
    return;
  }

  if (!req.body.side || !req.body.printer) {
    res.status(400).send("Printer and side needs to be specified")
    return;
  }
  const printer = req.body.printer + req.body.side;

  const newFilePath = `${UPLOAD_PATH}/${file.name}`
  await file.mv(newFilePath);
  try {
    const result = await SocPrintCommands.print({ sunfireId: req.body.sunfire_id, password: req.body.password }, printer, newFilePath);
    res.send(result)
  } catch (e) {
    res.status(500).send(e.message)
  } finally {
    fs.unlinkSync(newFilePath)
  }
})


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at port ${PORT}`);
});
