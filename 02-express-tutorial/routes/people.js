const express = require('express');
const { getAllPeople, addPerson, editPerson, deletePerson } = require('../controllers/people');
const router = express.Router();



// router.get('/', getAllPeople)
// router.post('/', addPerson)
// router.put('/:id', editPerson)
// router.delete('/:id', deletePerson)

router.route('/').get(getAllPeople).post(addPerson)
router.route('/:id').put(editPerson).delete(deletePerson)

module.exports = router