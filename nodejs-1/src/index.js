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
    
    return data.slice(0, 20).map(player => player.full_name)

    // for(let i = 0; i < 20; i++){
    //     const temp = data[i].full_name.split(" ")
    //     if(temp[0].length === 2){
    //         const test = [temp[0], temp[1]]
    //         aux.push(test.join(' '))
    //         // aux.push(temp[0] + temp[1])
    //     }else{
    //         aux.push(temp[0])
    //     }
    // }
    // console.log(aux)
}


//Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?
const q4 = () => {
    const data = readFile(); 
    // let array = []
    
    data.sort(function (a, b) {
        tempA = parseFloat(a.eur_wage)
        tempB = parseFloat(b.eur_wage)
        
        if (tempA > tempB) {
          return -1;
        }else if (tempA < tempB) {
          return 1;
        }else{
          return 0;
        }
    })

    return data.slice(0, 10).map(player => player.full_name)

    //   for(let i = 0; i < 10; i++){
    //       array[i] = [data[i].full_name, data[i].eur_wage]
    //   }
}


//Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?
const q5 = () => { 
    const data = readFile(); 
    
    data.sort(function (a, b) {
        const tempA = parseInt(a.age)
        const tempB =parseInt(b.age)
        const Awage = parseFloat(a.eur_wage)
        const Bwage = parseFloat(b.eur_wage)
        
        if(tempA && tempB){
            if(tempA > tempB){
                return -1
            }else if (tempA < tempB){
                return 1 
            }else{
                if(Awage && Bwage){
                    if(Awage > Bwage){
                        return -1
                    }else if(Awage < Bwage){
                        return 1
                    }else{
                        return 0
                    }
                }      
            }        
        }
    })

    return data.slice(0, 10).map(player => player.full_name)

    //   for(let i = 0; i < 10; i++){
    //       array[i] = data[i].full_name
    //         //console.log(data[i].full_name,data[i].age,data[i].eur_wage)
    //   }

}

//Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as chaves são as idades e os valores a contagem.
const q6 = () => {

const data = readFile();
let objReturn = {}

data.forEach((elem) => {
    if (elem.age){
        if(!objReturn[elem.age]){
            objReturn[elem.age] = 0
        }
        objReturn[elem.age] += 1
    }
})

// console.log(objReturn)
return objReturn
}


module.exports = { q1, q2, q3, q4, q5, q6 }
