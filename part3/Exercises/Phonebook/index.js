const express = require("express");
const app = express();

const PORT = 3001;

app.use(express.json());

const persons = [
  {
    name: "Arto Hellas",
    number: "123-456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const lenOfPhonebook = persons.length;
  const date = new Date().toUTCString();
  res.send(`Phonebook has info for ${lenOfPhonebook} \n${date}`);
});

app.listen(PORT);
console.log(`Listening on port: ${PORT}`);
