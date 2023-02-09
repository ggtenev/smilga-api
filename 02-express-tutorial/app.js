const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/api/people', (req, res) => {
  res.status(200).json({
    success: true,
    data: people
  })
})
app.post('/api/people', (req, res) => {
  
  const { name } = req.body
  if (!name) {
    return res.status(400).json({
      success: false,
      msg:'You need to provide name value'
    })
  }
  const id = people.length+1
  console.log(name);
  people.push({ id, name })
  console.log(people);
  res.status(201).json({
   success:true,
   person:name
  })
})
app.post('/login', (req, res) => {
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please provide credentials')
})

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const person = people.find(p => id === Number(id))
  if (!name || !person) {
    return res.status(404).json({
      success: false,
      msg:`No person with id ${id} exist or you haven't provided a name`
    })
  }
  people = people.map(p => {
    let temp = p
    if (temp.id === Number(id)) {
      temp.name = name
    }
    return temp
  })

  res.status(201).json({
    success: true,
    data:people
  })
})

app.delete('/api/people/:id',(req, res) => {
  const { id } = req.params
  const person = people.find(p => p.id === Number(id))
   if (!person) {
    return res.status(404).json({
      success: false,
      msg:`No person with id ${id} exist `
    })
   }
  people = people.filter(p => p.id !== Number(id))
  res.status(201).json({
    success: true,
    data:person
  })
})

app.listen(5000, () => {
  console.log('Listen');
})