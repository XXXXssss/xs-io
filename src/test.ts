import io from './index';

async function main(){
    await io.write('./test.txt',"Hello World!");
}
main();