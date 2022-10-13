const fs = require('fs');

fs.readFile('./txt/sta23\rt.txt','utf-8',(err1,data1)=>{
    if(err1) return console.log('there is an error');
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err2,data2)=>{
        console.log(data2);
        
        fs.writeFile('./txt/final.txt',`${data1}\n${data2}`,'utf-8',(err)=>{
            console.log('your file has been written.')
        })
    })
  
})
console.log('reading file');





// Blocking , Sync way
// const y=fs.readFileSync('./txt/input.txt','utf-8');
// console.log(y);
// const textOut=`${y} Ghoniem`
// console.log(textOut);
// fs.writeFileSync('./txt/output.txt',textOut);
// const z=fs.readFileSync('./txt/output.txt','utf-8');
// console.log(z)

 