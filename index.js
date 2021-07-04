const express = require('express')
const app = express()
const logger = require('morgan')


const users = [
  {id:1, name:'Alice'},
  {id:2, name:'Bek'},
  {id:3,name:'Chris'}
]
app.get('/',(req, res)=> res.send('Hello world'))

app.get('/users',(req, res)=> 
  {
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit, 10)
    if(Number.isNaN(limit)){

      res.status(400).end()
    }else{
      res.json(users.slice(0, limit))
    }
  })

 
app.get('/users/:id',(req, res)=>{
  //1. id값을 얻어서
  //2. users 배열을 조회한다
  //3. 유저를 찾았다면 응답한다


  // 1. id값을 얻어낸다
  const id = parseInt(req.params.id, 10)

  //2. users배열 조회 
  const user = users.filter(user => user.id === id)[0]
  
  //3. res응답
  res.json(user)

})


module.exports = app