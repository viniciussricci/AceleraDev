const express = require('express')
const app = express()
const fs = require('fs');

const read = fs.readFileSync(`${process.cwd()}/imdb-movies.json`, `utf8`);
const movies = JSON.parse(read);


app.get('/v1/movie', async (req, res, next) => {
  const random = Math.floor(Math.random() * (movies.length - 0) + 0);

  const { Director, Title } = movies[random] 

  res.json({
   director: Director,
   movie: Title
 })
})

app.get('/v1/movie/:director', async (req, res, next) => {
  const name = req.params.director

  const array = movies.filter(element => element.Director === name);

  if(array.length === 0){
      return;
  }else if(array.length === 1){
    const { Director, Title } = array[0]

    res.json({
      director: Director,
      movie: Title
  })
  }else{ 
      const random =  (Math.floor(Math.random()*array.length - 0) + 0);

      const { Director, Title } = array[random]

      res.json({
        director: Director,
        movie: Title
    })
  }
})

const start = async (port = 8080) => {
  app.listen(port, function () {
    console.info('%s listening at port %s', app.name, port)
  })
}

const stop = () => {
  app.close(() => {
    console.info('App Stopped')
  })
}


// function retAleatorio(){
//   const random = Math.floor(Math.random() * (movies.length - 0) + 0);
  
//   // const aux = movies.filter(elem => elem.Rank === random);

//   const { Director, Title } = movies[random] 

//  res.json({
//    director: Director,
//    movies: Title
//  })

//   const result = JSON.stringify(aux, ['Director', 'Title']);

//   return result;
// }

// function retDiretor(chave){

//   const array = movies.filter(element => element.Director === chave);

//   if(array.length === 0){
//       return;
//   }else if(array.length === 1){
//       return array
//       // console.log(JSON.stringify(array, ['Director', 'Title']))
//   }else{
//       const rank = array.map(element => element.Rank);
     
//       const random =  (Math.floor(Math.random()*rank.length - 0) + 0);

//       const aux = array.filter(elem => elem.Rank === rank[random]);

//       return aux
//   }
// }

module.exports = {
  app,
  start,
  stop
}
