import {promised_exec} from "./util";

class ServerStatus {
    static async get_server_status(): Promise<boolean> {
        // Checks if tunnel is present
        try {
            //TODO: Note that this command takes a shorter time on the server
            const {stdout, stderr} = await promised_exec("lsof -i | grep ssh | grep comp.");
            if (stderr || !stdout) {
                return false;
            }
            return true;
        } catch {
            return false;
        }
    }
}

export default ServerStatus;