/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://isaul:${password}@cluster0.jpkhh.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => console.log(person.name, person.number))
    mongoose.connection.close()
  })

} else {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  console.log(newPerson)
  console.log('---------')

  newPerson.save().then(() => {
    console.log(`added ${newPerson.name} with number ${newPerson.number} to the phonebook`)
    mongoose.connection.close()
  })
}