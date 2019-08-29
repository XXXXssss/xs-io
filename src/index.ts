import rp from 'request-promise-native';
import * as fp from './lib/fs-promise';

export default class XsIO {
    public static async read(path: string, options?: Object): Promise<Buffer>{
        if(path.startsWith('http://') || path.startsWith('https://')){
            let trueOptions: rp.Options = Object.assign({}, {
                method:'GET',
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
    public static async write(path: string,data: Buffer|string|Object, options?: Object): Promise<undefined>{
        if(options){
            return fp.writeFile(path, data, options);
        }
        else{
            return fp.writeFile(path, data);
        }
    }
    public static async post(path: string,data: string|Object, options?: Object): Promise<string>{
        let trueOptions: rp.Options = Object.assign({}, {
            method:'POST',
            url: path,
            body: data
        });
        if(options){
            trueOptions = Object.assign(trueOptions,options);
        }
        return rp(trueOptions);
    }
    public static async wait(t: number): Promise<undefined>{
        return new Promise((res,rej) => {
            setTimeout(res, t);
        });
    }
}