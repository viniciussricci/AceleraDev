const fs = require('fs')

const readFile = () => {
    const file = fs.readFileSync('data.csv').toString();
    
    const fileLines = file.split('\n');

    const headerLine = fileLines[0];

    const headers = headerLine.split(',');
    
    const players = fileLines.map(player => {
        const temp = player.split(',')
        
        const objReturn = {}

        headers.forEach((element, index) => {
            objReturn[element] = temp[index] 
        })

        return objReturn;
    })

   return players.slice(1); 
}




//Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo? 
const q1 = () => {
    const data = readFile();

    const result = data.reduce((acc, cur) => {
        if(cur.nationality && !acc.find(elem => elem === cur.nationality)) {
            acc.push(cur.nationality)
        }
        return acc  
    }, [])

    return result.length
}

//Quantos clubes (coluna `club`) diferentes existem no arquivo?
const q2 = () => {
    const data = readFile();

    const result = data.reduce((acc, cur) => {
        if(cur.club && !acc.find(elem => elem === cur.club)){
            acc.push(cur.club)
        }
        return acc
    }, [])

    return result.length
}


//Liste o primeiro nome dos 20 primeiros jogadores de acordo com a coluna `full_name`.
const q3 = () => {
    const data = readFile();
    let array = []

    for(let i = 0; i < 20; i++){
        const temp = data[i].full_name.split(" ")
        // array.push(temp[0])

        if(temp[0].length === 2){
            const aux  =  [temp[0], temp[1]]
            array.push(aux.join(' '))
         }else{
             array.push(temp[0])
         }
    }
    return array
}


//Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?
const q4 = () => {
    const data = readFile(); 
    let array = []
    
    data.sort(function (a, b) {
        // console.log(a.eur_wage, b.eur_wage)
        if (a.eur_wage > b.eur_wage) {
        //console.log("-1", a.eur_wage, b.eur_wage)
          return -1;
        }
        if (a.eur_wage < b.eur_wage) {
        //console.log("1", a.eur_wage, b.eur_wage)
          return 1;
        }
        //console.log("0", a.eur_wage, b.eur_wage)
        return 0;
      })

      console.log(data)

    //   for(let i = 0; i < 10; i++){
    //       array[i] = [data[i].full_name, data[i].eur_wage]
    //   }

      //console.log(array)
      return array    
}


//Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?
const q5 = () => { 
    const data = readFile(); 
    let array = []
    
    data.sort(function (a, b) {
        
        if (a.age > b.age) {
        //console.log("-1", a.eur_wage, b.eur_wage)
          return -1;
        }else if(a.age < b.age) {
        //console.log("1", a.eur_wage, b.eur_wage)
          return 1;
        }else{
            if(a.eur_wage > b.eur_wage){
                return -1
            }else{
                return 1
            }
        }
      })

      for(let i = 0; i < 10; i++){
          array[i] = [data[i].full_name, data[i].age]
            //console.log(data[i].full_name,data[i].age,data[i].eur_wage)
      }

      console.log(array)
      return array
}

//Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as chaves são as idades e os valores a contagem.
const q6 = () => {

const data = readFile();
const aux = []

for (let i = 0; i < data.length; i++) {
    if(data[i].age){
        aux[i] = data[i].age
    }
}

console.log(data.length)
console.log(aux.length)

const objReturn = {}

aux.forEach((element, index) => {
    // console.log(element, index)
    // aux[index] = `${element}: ${index}`
})

console.log(aux)

// console.log(objReturn);



// var novaArr = aux.filter(function(este, i) {
//     return aux.indexOf(este) === i;
// });

//console.log(novaArr)

// aux.forEach((element, index) => {
//     console.log(element, index);
// })

}

const veri = q4();

module.exports = { q1, q2, q3, q4, q5, q6 }
