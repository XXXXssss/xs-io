import fs from 'fs';
import rp from 'request-promise-native';

interface requestOptions{
    method: string;
}

const defaultHttpReadOption: requestOptions = {
    method:'GET'
}

export interface IXsIoConfig{
    fileReadOption?: any,
    httpReadOption?: requestOptions,
    httpWriteOption?: requestOptions
}

export default class XsIO {
    private Arg: IXsIoConfig;
    constructor(arg?: IXsIoConfig){
        this.Arg = {};
        if(arg){
            this.Arg.httpReadOption = arg.httpReadOption || defaultHttpReadOption;
        }
    }
    private async readFile(path: string): Promise<Buffer>{
        return new Promise((resolve,reject) => {
            fs.readFile(path,(err, data) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    public async read(path: string): Promise<Buffer>{
        if(path.startsWith('http://') || path.startsWith('https://')){
            let options: rp.Options = Object.assign({}, this.Arg.httpReadOption, {url: path});
            return rp.get(options);
        }
        else{
            return this.readFile(path);
        }
    }
}