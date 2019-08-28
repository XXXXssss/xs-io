import io from './index';

async function main(){
    let xio = new io(),
        res: string = (await xio.read('http://www.zl-studio.cn')).toString();
    console.log(res);
}
main();