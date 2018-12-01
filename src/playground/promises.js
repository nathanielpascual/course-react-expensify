const promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('This is my resolve data');
    },1500);
  
});

console.log('before');
promise.then((data)=>{
    console.log('1',data);
});

console.log('after');