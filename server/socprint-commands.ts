
import {quote} from "shell-quote";
import {exec} from "child_process";
import {promisify} from "util";

const SOCPRINT_COMMAND = "./socprint.sh"
const SSH_PASS_COMMAND = "sshpass"
const SSH_PASS_FLAG = "-p"

const promised_exec = promisify(exec);

async function run_command(command: string):Promise<string> {
    const {stdout, stderr} = await promised_exec(command, { encoding: 'utf-8' })
    let output:string = "";
    if (stdout) { output += `stdout:${stdout}` }
    if (stderr) { output += `stderr:${stderr}`}
    console.log(output);
    return output;
};

function form_command(credentials: Credentials, option: SocprintCommandOptions, ...args:any[] ): string  {
    return quote([SSH_PASS_COMMAND, SSH_PASS_FLAG, credentials.password, SOCPRINT_COMMAND, option, credentials.sunfireId, ...args ]);
};

enum SocprintCommandOptions {
    Help = "help",
    Print = "print",
    Quota = "quota", //Failed as tty allocation does not work
    Jobs = "jobs"
}

interface Credentials {
    sunfireId: string;
    password: string;
}

class SocPrintCommands {
    static async print(credentials: Credentials, printer:string, filePath:string):Promise<string> {
        const command = form_command(credentials, SocprintCommandOptions.Print, printer, filePath);
        return run_command(command)
    }
}

export default SocPrintCommands