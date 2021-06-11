import {promised_exec} from "./util";


const KEEP_ALIVE_INTERVAL = 15 * 1000;
const STATUS_INTERVAL = 5 * 1000;

interface ServerStatusInfo {
    last_check_time: number,
    is_up: boolean,
}

class ServerStatus {
    static info:ServerStatusInfo = {
        last_check_time: 0,
        is_up: true
    };
    static async get_server_status(): Promise<boolean> {
        const curr_time = Date.now();
        // Freshed if wasn't checked within the last STATUS_INTERVAL
        if (curr_time - this.info.last_check_time > STATUS_INTERVAL) {
            this.info.is_up = await this.get_server_status_helper();
            this.info.last_check_time = curr_time;
        }
        return this.info.is_up;
    }
    private static async get_server_status_helper(): Promise<boolean> {
        // Checks if tunnel is present
        try {
            //TODO: Note that this command takes a shorter time on the server
            //NOTE: promised_exec throws error when greped on empty input
            const {stdout, stderr} = await promised_exec("lsof -i | grep ssh | grep comp.");
            if (stderr || !stdout) {
                return false;
            }
            return true;
        } catch {
            return false;
        }
    }

    static async start_keep_alive_service():Promise<void> {
        this.send_keep_alive().then((res)=>console.log("SSH alive: " + res));
        setTimeout(this.start_keep_alive_service, KEEP_ALIVE_INTERVAL);
    }


    static async send_keep_alive(): Promise<boolean> {
        try {
            const {stdout, stderr} = await promised_exec(`sshpass -p ${process.env.SUNFIRE_TUNNEL_PASS} ssh ${process.env.SUNFIRE_TUNNEL_USER}@${process.env.SUNFIRE_ADDRESS} 'echo ok'`);
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
