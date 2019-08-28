import rp from 'request-promise-native';
import * as fp from './lib/fs-promise';

interface requestOptions{
    method: string;
}

const defaultHttpReadOption: requestOptions = {
    method:'GET'
}

export interface IXsIoConfig{
    fileReadOption?: any,
    httpReadMethod?: string,
    httpWriteMethod?: string
}

export default class XsIO {
    private Arg: IXsIoConfig;
    constructor(arg?: IXsIoConfig){
        this.Arg = {};
        if(arg){
            this.Arg.httpReadMethod = arg.httpReadMethod || 'GET';
            this.Arg.httpWriteMethod = arg.httpWriteMethod || 'POST';
        }
    }
    public async read(path: string, options?: Object): Promise<Buffer>{
        if(path.startsWith('http://') || path.startsWith('https://')){
            let trueOptions: rp.Options = Object.assign({}, {
                method:this.Arg.httpReadMethod,
                url: path
            });
            if(options){
                trueOptions = Object.assign(trueOptions,options);
            }
            return rp(trueOptions);
        }
        else{
            if(options){
                return fp.readFile(path, options);
            }
            else{
                return fp.readFile(path);
            }
        }
    }
    public async write(path: string,data: string|Object, options?: Object): Promise<rp.FullResponse|undefined>{
        if(path.startsWith('http://') || path.startsWith('https://')){
            let trueOptions: rp.Options = Object.assign({}, {
                method:this.Arg.httpWriteMethod,
                url: path,
                body: data
            });
            if(options){
                trueOptions = Object.assign(trueOptions,options);
            }
            return rp(trueOptions);
        }
        else{
            if(options){
                return fp.writeFile(path, data, options);
            }
            else{
                return fp.writeFile(path, data);
            }
        }
    }
}