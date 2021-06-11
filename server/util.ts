import { exec, PromiseWithChild } from 'child_process';
import { promisify } from 'util';

function promised_exec(command: string): PromiseWithChild<{ stdout: string; stderr: string }> {
    return promisify(exec)(command, { encoding: 'utf-8' });
}

async function run_command(command: string): Promise<string> {
    const { stdout, stderr } = await promised_exec(command);
    let output = '';
    if (stdout) {
        output += `stdout:${stdout}`;
    }
    if (stderr) {
        output += `stderr:${stderr}`;
    }
    return output;
}

export { promised_exec, run_command };
