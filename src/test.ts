import io from './index';

async function main(){
    let xio = new io();
    await xio.write('./test.txt',"Hello World!");
}
main();