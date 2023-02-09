let { people } = require('../data')

const getAllPeople = (req, res) => {
  res.status(200).json({
    success: true,
    data: people
  })
}

const addPerson = (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({
      success: false,
      msg:'You need to provide name value'
    })
  }
  const id = people.length+1
  people.push({ id, name })
  res.status(201).json({
   success:true,
   person:name
  })
}

const editPerson = (req, res) => {
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
}

const deletePerson = (req, res) => {
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
}

module.exports = {addPerson,deletePerson,editPerson,getAllPeople}