import fs from 'fs';
export async function readFile(path: string, options?: Object): Promise<Buffer>{
    if(options){
        return new Promise((resolve,reject) => {
            fs.readFile(path, options, (err, data) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    else{
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
}
async function _writeFile(path: string, data: Buffer|string, options?: Object): Promise<undefined>{
    if(options){
        return new Promise((resolve,reject) => {
            fs.writeFile(path, data, options, (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    else{
        return new Promise((resolve,reject) => {
            fs.writeFile(path, data, (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
export async function writeFile(path: string, data: Buffer|number|string|Object, options?: Object): Promise<undefined>{
    let trueData: Buffer|string;
    if(data instanceof Object){
        trueData = JSON.stringify(<Object>data);
    }
    else if(typeof data == 'number'){
        trueData = data.toString();
    }
    else if(typeof data == 'string'){
        trueData = <string>data;
    }
    else{
        trueData = <Buffer>data;
    }
    if(options){
        return _writeFile(path,trueData,options);
    }
    else{
        return _writeFile(path,trueData);
    }
}
export async function readDir(path: string): Promise<string[]>{
    return new Promise((resolve,reject) => {
        fs.readdir(path, (err, files)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(files);
            }
        });
    });
}