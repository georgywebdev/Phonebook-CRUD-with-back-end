const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const persons = [
  {
    name: "Rida Holcomb",
    number: "443-690-778",
    id: 1,
  },
  {
    name: "Dan Abramov",
    number: "269-807-720",
    id: 2,
  },
  {
    name: "Harvey Roberson",
    number: "773-549-030",
    id: 3,
  },
  {
    name: "Tony Macdonald",
    number: "678-981-127",
    id: 4,
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

let info = `Phonebook has ${persons.length} persons
${new Date()}`;

app.get("/info", (request, response) => {
  response.json(info);
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  }

  if (persons.find((person) => person.name === body.name)) {
    return response
      .status(409)
      .json({ error: "The name already exists in the phonebook" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons.push(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
