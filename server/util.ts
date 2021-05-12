
import {exec, PromiseWithChild} from "child_process";
import {promisify} from "util";

function promised_exec(command:string):PromiseWithChild<{stdout:string, stderr:string}> {
    return promisify(exec)(command, { encoding: 'utf-8' });
}

export {
    promised_exec
}