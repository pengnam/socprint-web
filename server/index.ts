import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import ServerStatus from './server-status';
import * as dotenv from 'dotenv';
import PrintJob from './printjob';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
//TODO: Try useTempFiles option
app.use(
    fileUpload({
        createParentPath: true,
    }),
);
const PORT = 8000;

app.get('/ping', async (req: Request, res: Response) => {
    res.send('pong');
});

app.get('/sunfire_up', async (req: Request, res: Response) => {
    // Checks the tunnel connection between sunfire and DO is running
    res.send(await ServerStatus.get_server_status());
});

app.post('/print', async (req: Request, res: Response): Promise<void> => {
    const {
        files,
        body: { sunfire_id, password, side, printer },
    } = req;

    if (!files) {
        res.status(400).send('No files sent for printing');
        return;
    }

    const file = files.file;
    if (Array.isArray(file)) {
        res.status(400).send('Expected single file');
        return;
    }

    if (!side || !printer) {
        res.status(400).send('Printer and side needs to be specified');
        return;
    }

    const printJob = new PrintJob(sunfire_id, password, file, printer, side);
    try {
        const result = await printJob.submit();
        res.send(result);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at port ${PORT}`);
});
