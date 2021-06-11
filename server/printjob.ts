import fileUpload from 'express-fileupload';
import fs from 'fs';
import SocPrintCommands, { Credentials } from './socprint-commands';

enum JobState {
    Received,
    Submitted,
    Completed,
    Cancelled,
}

class PrintJob {
    credentials: Credentials;
    file: fileUpload.UploadedFile;
    printer: string;
    side: string;
    state: JobState;

    constructor(sunfireId: string, password: string, file: fileUpload.UploadedFile, printer: string, side: string) {
        this.credentials = { sunfireId, password };
        this.file = file;
        this.printer = printer;
        this.side = side;
        this.state = JobState.Received;
    }

    async submit(): Promise<string> {
        const filePath = `$./uploads/${this.file.name}`;
        await this.file.mv(filePath);
        try {
            const result = await SocPrintCommands.print(this.credentials, this.printer + this.side, filePath);
            this.state = JobState.Submitted;
            return result;
        } catch (e) {
            this.state = JobState.Cancelled;
            throw e;
        } finally {
            fs.unlinkSync(filePath);
        }
    }
}

export default PrintJob;
