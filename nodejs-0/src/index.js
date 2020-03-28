let fibo = {
    sqa : []
}

const fibonacci = () => {
    let a = 0, b = 1,i = 0, num = 350, temp;
    while (b <= num){
        temp = a;
        a = a + b;
        b = temp;
        fibo.sqa[i] = b;
        //console.log(fibo[i]);
        i++;
    }
    return fibo.sqa; 
}

fibonacci();

const isFibonnaci = (num) => {
let result = fibo.sqa.some(element => element === num);
  //if (fibo.sqa.indexOf(num) !== -1){
  //    return true;
  //}else{
  //    return false;
  //}
  return result;
}

console.log(fibo.sqa);
console.log(isFibonnaci(53));
console.log(isFibonnaci(377));
console.log(isFibonnaci(5));
console.log(isFibonnaci(34));


module.exports = {
    fibonacci,
    isFibonnaci
}
