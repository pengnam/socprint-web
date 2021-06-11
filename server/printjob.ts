import fileUpload from 'express-fileupload';
import { Credentials } from './socprint-commands';

export interface PrintJob {
    credentials: Credentials;
    file: fileUpload.UploadedFile;
    printer: string;
    side: string;
}

export const create_printjob = (
    sunfireId: string,
    password: string,
    file: fileUpload.UploadedFile,
    printer: string,
    side: string,
): PrintJob => ({
    credentials: { sunfireId, password },
    file,
    printer,
    side,
});
